import Oscilloscope from './Oscilloscope'

let Synth = () => {

  /*
   *  Your code here!
   */

  let ctx = new AudioContext()

  let o, mod, modGain, outputGain

  let playNote = (frequency) => {
    o = ctx.createOscillator()
    mod = ctx.createOscillator()
    modGain = ctx.createGain()
    outputGain = ctx.createGain()

    mod.type = `sawtooth`
    mod.frequency.value = 0
    mod.connect(modGain)
    modGain.connect(o.frequency)

    o.type = `sawtooth`
    o.frequency.value = frequency
    o.connect(outputGain)

    outputGain.gain.value = 1
    outputGain.connect(ctx.destination)

    outputGain.connect(Oscilloscope(ctx))

    o.start()
    mod.start()
  }

  let restNote = () => {
    scheduleRelease(outputGain)
  }

  let scheduleRelease = (source) => {
    let amplitude = source.gain
    amplitude.cancelScheduledValues(ctx.currentTime)
    amplitude.setValueAtTime(amplitude.value, ctx.currentTime)
    amplitude.linearRampToValueAtTime(0, ctx.currentTime + 0.28)
  }

  return (UI)  => {

    /*
     *  Listen to UI changes!
     */

    if (UI.activeKeys.length) {
      playNote(UI.activeKeys[0])
      mod.frequency.value = UI.knobs.knob2.value
      modGain.gain.value = UI.knobs.knob3.value
      outputGain.gain.value = UI.masterVolume
      o.type = UI.waveShapes.shape1
    }
    else {
      restNote()
    }

  }
}

export default Synth

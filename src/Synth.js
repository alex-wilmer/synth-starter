import Oscilloscope from './Oscilloscope'

let Synth = () => {

  /*
   *  Your code here!
   */

  let ctx = new AudioContext()

  let power, o, mod, modGain, outputGain

  let powerUp = () => {
    power = true
    o = ctx.createOscillator()
    mod = ctx.createOscillator()
    modGain = ctx.createGain()
    outputGain = ctx.createGain()

    mod.type = `sawtooth`
    mod.connect(modGain)
    modGain.connect(o.frequency)

    o.type = `sawtooth`
    o.frequency.value = 200
    o.connect(outputGain)

    outputGain.gain.value = 1
    outputGain.connect(ctx.destination)

    outputGain.connect(Oscilloscope(ctx))

    o.start()
    mod.start()
  }

  let powerDown = () => {
    power = false
    o.stop()
    mod.stop()
  }

  return (UI)  => {

    /*
     *  Listen to UI changes!
     */

    if (UI.power && !power) powerUp()
    else if (!UI.power && power) powerDown()

    if (power) {
      o.frequency.value = UI.knobs.knob1.value
      modGain.gain.value = UI.knobs.knob2.value
      mod.frequency.value = UI.knobs.knob3.value

      outputGain.gain.value = UI.masterVolume
    }

  }
}

export default Synth

import Oscilloscope from './Oscilloscope'

let Synth = () => {

  /*
   *  Your code here!
   */

  let ctx = new AudioContext()
  let masterGain = ctx.createGain()
  let biquadFilter = ctx.createBiquadFilter()

  biquadFilter.type = `bandpass`
  biquadFilter.gain.value = 25

  biquadFilter.connect(masterGain)
  masterGain.connect(ctx.destination)
  masterGain.connect(Oscilloscope(ctx))

  let o, oGain, mod, modGain, lfo

  let playNote = (UI) => {
    o = ctx.createOscillator()
    oGain = ctx.createGain()
    mod = ctx.createOscillator()
    modGain = ctx.createGain()

    lfo = ctx.createOscillator()

    mod.connect(modGain)
    modGain.connect(o.frequency)

    o.frequency.value = UI.knobs.knob1.value
    o.type = UI.waveShapes.shape1
    o.connect(oGain)

    oGain.connect(biquadFilter)

    mod.frequency.value = UI.knobs.knob2.value
    modGain.gain.value = UI.knobs.knob3.value
    lfo.frequency.value = UI.knobs.knob4.value
    o.type = UI.waveShapes.shape1
    mod.type = UI.waveShapes.shape2
    lfo.type = UI.waveShapes.shape4

    o.start()
    mod.start()
    lfo.start()
  }

  let releaseNote = (time) => {
    if (oGain) {
      oGain.gain.linearRampToValueAtTime(
        0,
        ctx.currentTime + (time / 80)
      )
    }
  }

  return {

    onUIChange(UI) {

      /*
       *  Listen to UI changes!
       */

      masterGain.gain.value = UI.masterVolume
      biquadFilter.frequency.value = UI.knobs.knob4.value
    },

    onSequencerEvent(UI) {
      playNote(UI)
      releaseNote(UI.sliders.slider4.value)
    },

  }
}

export default Synth

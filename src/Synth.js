import Oscilloscope from './Oscilloscope'

let Synth = () => {

  /*
   *  Your code here!
   */

  let ctx = new AudioContext()
  let masterGain = ctx.createGain()

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

    oGain.connect(masterGain)

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

      if (UI.activeKeys.length) {
        playNote({ frequency: UI.activeKeys[0], shape: UI.waveShapes.shape1 })
      } else {
        releaseNote(UI.sliders.slider4.value)
      }

      masterGain.gain.value = UI.masterVolume
    },

    onSequencerEvent(UI) {
      playNote(UI)
      releaseNote(UI.sliders.slider4.value)
    },

  }
}

export default Synth

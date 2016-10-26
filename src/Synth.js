import Oscilloscope from './Oscilloscope'

let Synth = () => {

  /*
   *  Your code here!
   */

  let ctx = new AudioContext()
  let o = ctx.createOscillator()
  let mod = ctx.createOscillator()
  let modGain = ctx.createGain()

  mod.type = `saw`
  mod.connect(modGain)
  modGain.connect(o.frequency)

  o.type = `sawtooth`
  o.frequency.value = 200
  o.connect(ctx.destination)
  o.start()
  mod.start()
  o.connect(Oscilloscope(ctx))

  return (UI) => {

    /*
     *  Listen to UI changes!
     */

    o.frequency.value = UI.knobs.knob1
    modGain.gain.value = UI.knobs.knob2
    mod.frequency.value = UI.knobs.knob3

  }
}

export default Synth

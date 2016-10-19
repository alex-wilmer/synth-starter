import createScope from './scope'

export default () => {

  /*
   *  Your code here!
   */

  let ctx = new AudioContext()
  let o = ctx.createOscillator()
  let mod = ctx.createOscillator()
  let modGain = ctx.createGain()

  mod.type = 'sine'
  mod.connect(modGain)
  modGain.connect(o.frequency)

  o.type = 'square'
  o.frequency.value = 200
  o.connect(ctx.destination)
  o.start()
  mod.start()
  o.connect(createScope(ctx))

  return state => {

    /*
     *  Listen to UI changes!
     */

    o.frequency.value = state.knobs.knob1
    modGain.gain.value = state.knobs.knob2
    mod.frequency.value = state.knobs.knob3
  }
}

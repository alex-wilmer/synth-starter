import createScope from './scope'

export default () => {

  /*
   *  Your code here!
   */

  let ctx = new AudioContext()
  let o = ctx.createOscillator()
  o.type = 'square'
  o.frequency.value = 200
  o.connect(ctx.destination)
  o.start()
  o.connect(createScope(ctx))

  return state => {

    /*
     *  Listen to UI changes!
     */

    o.frequency.value = state.knobs.knob1
  }
}

import { createStore } from 'redux'
import initState from './state'

export default () => {
  return createStore(
    (state = initState, action) => {
      switch (action.type) {
        case `UPDATE_KNOB`:
          return {
            ...state,
            knobs: {
              ...state.knobs,
              [action.id]: Math.max(0, action.value),
            },
          }
        default:
          return state
      }
    }
  )
}

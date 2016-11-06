import { createStore } from 'redux'
import { handleActions } from 'redux-actions'
import initState from './state'

export default () => createStore(handleActions({

  TOGGLE_POWER: (state) => ({
    ...state,
    power: !state.power,
  }),

  UPDATE_MASTER_VOLUME: (state, action) => ({
    ...state,
    masterVolume: action.value / 100,
  }),

  UPDATE_KNOB_VALUE: (state, action) => ({
    ...state,
    knobs: {
      ...state.knobs,
      [action.id]: {
        ...state.knobs[action.id],
        value: Math.max(0, action.value),
      },
    },
  }),

  UPDATE_KNOB_NAME: (state, action) => ({
    ...state,
    knobs: {
      ...state.knobs,
      [action.id]: {
        ...state.knobs[action.id],
        name: action.name,
      },
    },
  }),

  CHANGE_SHAPE: (state, action) => ({
    ...state,
    waveShapes: {
      ...state.waveShapes,
      [action.id]: action.shape,
    },
  }),

  PLAY_KEY: (state, action) => {
    let sameKey = state.activeKeys.find(x => x === action.key)
    if (sameKey) return state

    return {
      ...state,
      activeKeys: [
        ...state.activeKeys,
        action.key,
      ],
    }
  },

  CLEAR_KEYS: (state) => ({
    ...state,
    activeKeys: [],
  }),

}, initState))

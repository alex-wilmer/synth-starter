import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { handleActions } from 'redux-actions'
import initState from './state'
import { autoRehydrate } from 'redux-persist'

export default () => createStore(handleActions({

  UPDATE: (state, action) => ({
    ...state,
    ...action.payload,
  }),

  TOGGLE_POWER: (state) => ({
    ...state,
    power: !state.power,
  }),

  TOGGLE_SEQUENCER: (state) => ({
    ...state,
    playing: !state.playing,
  }),

  TOGGLE_STEP: (state, action) => ({
    ...state,
    steps: {
      ...state.steps,
      [action.id]: !state.steps[action.id],
    },
  }),

  UPDATE_TEMPO: (state, action) => ({
    ...state,
    tempo: Math.max(20, action.value),
  }),

  UPDATE_STEP: (state) => ({
    ...state,
    step: (state.step + 1) % 16,
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

  UPDATE_SLIDER_VALUE: (state, action) => ({
    ...state,
    sliders: {
      ...state.sliders,
      [action.id]: {
        ...state.sliders[action.id],
        value: Math.max(0, action.value),
      },
    },
  }),

  UPDATE_SLIDER_NAME: (state, action) => ({
    ...state,
    sliders: {
      ...state.sliders,
      [action.id]: {
        ...state.sliders[action.id],
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

  CHANGE_FILTER: (state, action) => ({
    ...state,
    filterTypes: {
      ...state.filterTypes,
      [action.id]: action.filter,
    },
  }),

  PLAY_KEY: (state, action) => {
    return {
      ...state,
      activeKey: action.key,
    }
  },

  CLEAR_KEYS: (state) => ({
    ...state,
    activeKey: null,
  }),

  INCREMENT_OCTAVE: (state) => ({
    ...state,
    octave: state.octave + 1,
  }),

  DECREMENT_OCTAVE: (state) => ({
    ...state,
    octave: state.octave - 1,
  }),

}, initState), applyMiddleware(thunk), autoRehydrate())

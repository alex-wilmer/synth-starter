import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

let initState = {
  knobs: {
    knob1: 0,
    knob2: 0,
    knob3: 0,
    knob4: 0,
  }
}

let store = createStore(
  (state = initState, action) => {
    switch (action.type) {
      case 'UPDATE_KNOB':
        return {
          ...state,
          knobs: {
            ...state.knobs,
            [action.id]: Math.max(0, action.value),
          }
        }
      default:
        return state
    }
  }
)

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)

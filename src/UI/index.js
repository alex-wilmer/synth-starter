import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import App from './App'
import createStore from './store'

let store = createStore()
persistStore(store, {}, () => {
  store.dispatch({
    type: `UPDATE`,
    payload: {
      step: 0,
      playing: false,
    },
  })
})

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById(`root`)
)

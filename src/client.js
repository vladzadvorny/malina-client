/* eslint-disable no-underscore-dangle */
import { h, render } from 'preact'
import { Provider } from 'unistore/preact'

import createStore from './store'

import App from './App'

const store = createStore()

setTimeout(() => {
  if (typeof window !== 'undefined' && window.__STATE__) {
    store.setState(window.__STATE__)
    delete window.__STATE__
  }
}, 0)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
)

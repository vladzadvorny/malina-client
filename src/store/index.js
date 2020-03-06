import createStore from 'unistore'
import devtools from 'unistore/devtools'
import { connect as unistoreConnect } from 'unistore/preact'

import actions from './actions'

export const connect = mapStateToProps => WrappedComponent => {
  return unistoreConnect(mapStateToProps, actions)(WrappedComponent)
}

export default (state = {}) => {
  const initialState = {
    count: 0,
    app: {
      loading: true,
      token:
        typeof window !== 'undefined' ? localStorage.getItem('@token') : null,
      showAuth: false
    },
    me: {}
  }

  return process.env.NODE_ENV === 'production'
    ? createStore({ ...initialState, ...state })
    : devtools(createStore({ ...initialState, ...state }))
}

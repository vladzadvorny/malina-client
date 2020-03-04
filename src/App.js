import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Router } from 'preact-router'
import { createHashHistory } from 'history'

import './App.scss'
import { connect } from './store'
import { isCordova } from './constants/config'

import Feed from './pages/Feed'
import Find from './pages/Find'
import ChatList from './pages/ChatList'

const App = ({ route, increment }) => {
  const history = isCordova ? createHashHistory() : null

  useEffect(() => {
    setInterval(() => {
      increment()
    }, 1000)
  }, [])

  return (
    <Router url={route} history={history}>
      <Feed path="/" />
      <Find path="/find" />
      <ChatList path="/chat-list" />
    </Router>
  )
}

export default connect()(App)

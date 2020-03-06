import { h, Fragment } from 'preact'
import { useEffect } from 'preact/hooks'
import { Router } from 'preact-router'
import { createHashHistory } from 'history'

import './App.scss'
import { connect } from './store'
import { isCordova } from './constants/config'

import Feed from './pages/Feed'
import Find from './pages/Find'
import ChatList from './pages/ChatList'
import Editor from './pages/Editor'
import Loading from './components/Loading'
import Auth from './components/Auth'

const App = ({ app: { loading, showAuth }, route, fetchMe }) => {
  const history = isCordova ? createHashHistory() : null

  useEffect(() => {
    fetchMe()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Router url={route} history={history}>
        <Feed path="/" />
        <Find path="/find" />
        <ChatList path="/chat-list" />
        <Editor path="/editor" />
      </Router>
      {showAuth && <Auth />}
    </>
  )
}

export default connect(['app'])(App)

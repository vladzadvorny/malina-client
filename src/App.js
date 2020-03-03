import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { connect } from './store'

const App = ({ count, increment }) => {
  useEffect(() => {
    setInterval(() => {
      increment()
    }, 1000)
  }, [])

  return <div>{count}</div>
}

export default connect(['count'])(App)

import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { connect } from '../store'

import Layout from '../components/Layout'

const ChatList = ({ me, setShowAuth }) => {
  useEffect(() => {
    if (!me.id) {
      setShowAuth(true)
    }
  }, [])

  return <Layout>ChatList</Layout>
}

export default connect(['me'])(ChatList)

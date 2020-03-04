import { h } from 'preact'

import { connect } from '../store'

import Layout from '../components/Layout'

const ChatList = () => {
  return <Layout>ChatList</Layout>
}

export default connect(['me'])(ChatList)

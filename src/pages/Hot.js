import { h } from 'preact'

import { connect } from '../store'

import Layout from '../components/Layout'

const Hot = ({ count }) => {
  return <Layout>{count}</Layout>
}

export default connect(['count'])(Hot)

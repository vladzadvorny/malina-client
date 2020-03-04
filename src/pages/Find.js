import { h } from 'preact'

import { connect } from '../store'

import Layout from '../components/Layout'

const Find = () => {
  return <Layout>Find</Layout>
}

export default connect(['me'])(Find)

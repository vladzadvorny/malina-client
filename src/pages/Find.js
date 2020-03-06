import { h } from 'preact'
import { useEffect } from 'preact/hooks'

import { connect } from '../store'

import Layout from '../components/Layout'

const Find = ({ me, setShowAuth }) => {
  useEffect(() => {
    if (!me.id) {
      setShowAuth(true)
    }
  }, [])

  return <Layout>Find</Layout>
}

export default connect(['me'])(Find)

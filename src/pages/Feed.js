import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { connect } from '../store'

import Layout from '../components/Layout'
import Post from '../components/Post'

const Feed = () => {
  const [arr, setArr] = useState([])

  useEffect(() => {
    setArr(Array.from({ length: 40 }, () => Math.floor(Math.random() * 40)))
  }, [])

  return (
    <Layout>
      {arr.map(item => (
        <Post key={item} body={item} />
      ))}
    </Layout>
  )
}

export default connect()(Feed)

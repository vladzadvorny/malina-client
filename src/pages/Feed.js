import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { route } from 'preact-router'

import { connect } from '../store'
import { Plus } from '../utils/icons'

import Layout from '../components/Layout'
import Post from '../components/Post'
import Fab from '../components/Fab'

const Feed = () => {
  const [arr, setArr] = useState([])

  useEffect(() => {
    setArr(Array.from({ length: 40 }, () => Math.floor(Math.random() * 40)))
  }, [])

  return (
    <Layout>
      <Fab onClick={() => route('/editor', true)}>
        <Plus />
      </Fab>

      {arr.map(item => (
        <Post key={item} body={item} />
      ))}
    </Layout>
  )
}

export default connect()(Feed)

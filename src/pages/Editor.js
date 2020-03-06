import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import './Editor.scss'
import { connect } from '../store'
import { useLocalization } from '../utils/localization'
import { useMeta } from '../utils/meta'
import { siteName } from '../constants/config'
import { FileAlt, Image, Video } from '../utils/icons'

import Layout from '../components/Layout'

const Editor = ({ me, setShowAuth }) => {
  const { t } = useLocalization('editor')
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  // error
  const message = error !== null ? error.message : ''
  console.log(items)
  useMeta({
    title: `${t('editor')} — ${siteName}`
  })

  useEffect(() => {
    if (!me.id) {
      setShowAuth(true)
    }
  }, [])

  const getId = () =>
    Math.random()
      .toString(36)
      .substr(2)

  const addItem = item => setItems([...items, item])

  const changeItem = item =>
    setItems(
      items.map(_item => {
        if (_item.id === item.id) {
          return item
        }
        return _item
      })
    )

  const moveItem = (from, to) => {
    const newItems = [...items]
    newItems.splice(to, 0, newItems.splice(from, 1)[0])

    setItems(newItems)
  }

  const removeItem = index => {
    const newItems = [...items]
    newItems.splice(index, 1)

    setItems(newItems)
  }

  const addBoxItems = [
    {
      name: 'Text',
      Icon: FileAlt,
      item: {
        id: getId(),
        type: 'text',
        body: ''
      }
    },
    {
      name: 'Image',
      Icon: Image,
      item: {
        id: getId(),
        type: 'image',
        body: { id: '', path: '' }
      }
    },
    {
      name: 'Video',
      Icon: Video,
      item: {
        id: getId(),
        type: 'video',
        body: { id: '', provider: '' }
      }
    }
  ]

  return (
    <Layout
      classContainer="editor"
      headerInfo={{
        button: 'back',
        title: t('editor')
      }}
    >
      Editor
    </Layout>
  )
}

export default connect(['me'])(Editor)

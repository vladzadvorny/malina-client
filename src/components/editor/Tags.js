/* eslint-disable no-unused-vars */
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import debounce from 'lodash.debounce'

import './Tags.scss'
import { uri } from '../../constants/config'
import { connect } from '../../store'
import { useLocalization } from '../../utils/localization'
import { Times } from '../../utils/icons'

const Tags = ({ tags, setTags, app: { token } }) => {
  const { t } = useLocalization('editor')
  const [tag, setTag] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (tag.length > 1) {
      fetchTags()
    } else {
      setSuggestions([])
    }
  }, [tag])

  // eslint-disable-next-line no-shadow
  const addTag = tag => {
    setTag('')
    setSuggestions([])
    setTags([...tags.filter(item => tag !== item), tag])
  }

  // eslint-disable-next-line no-shadow
  const removeTag = tag => setTags(tags.filter(item => tag !== item))

  const fetchTags = debounce(async () => {
    try {
      const res = await fetch(`${uri}/tags?q=${tag}`, {
        headers: new Headers({
          Authorization: `Bearer ${token}`
        })
      })
      const data = await res.json()

      setSuggestions(tag.length > 1 ? data.tags : [])
    } catch (error) {
      console.log(error)
    }
  }, 500)

  return (
    <ul className="editor-tags">
      {/* eslint-disable-next-line no-shadow */}
      {tags.map(tag => (
        <li className="tag" key={tag}>
          {tag}
          <span
            className="remove"
            role="presentation"
            onClick={() => removeTag(tag)}
          >
            <Times />
          </span>
        </li>
      ))}

      <div className="input">
        <input
          type="text"
          value={tag}
          onInput={({ target: { value } }) => {
            if (value.substr(value.length - 1) === ',' && tag) {
              addTag(tag)
              return
            }

            setTag(value.replace(/[^a-zA-Zа-яА-ЯЁё]/g, ''))
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addTag(tag)
            }
          }}
          placeholder={t('tag')}
        />

        {!!suggestions.length && (
          <ul>
            {suggestions.map(({ id, name }) => (
              <li key={id} role="presentation" onClick={() => addTag(name)}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ul>
  )
}

export default connect(['app'])(Tags)

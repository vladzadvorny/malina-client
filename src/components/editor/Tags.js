import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import debounce from 'lodash.debounce'

import './Tags.scss'
import { uri } from '../../constants/config'
import { connect } from '../../store'

const Tags = ({ tags, setTags, app: { token } }) => {
  const [tag, setTag] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (tag.length > 1) {
      fetchTags()
    } else {
      setSuggestions([])
    }
  }, [tag])

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
    <div className="editor-tags">
      <div className="input">
        <input type="text" value={tag} onInput={e => setTag(e.target.value)} />

        {!!suggestions.length && (
          <ul>
            {suggestions.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default connect(['app'])(Tags)

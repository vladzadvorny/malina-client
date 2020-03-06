import { h } from 'preact'
import { route } from 'preact-router'
import { useRef, useEffect, useState } from 'preact/hooks'

import './Auth.scss'
import { connect } from '../store'
import { uri } from '../constants/config'
import { useLocalization } from '../utils/localization'

import Loading from './Loading'

const Auth = ({ setShowAuth, setMe, setToken }) => {
  const { t } = useLocalization('auth')
  const ref = useRef(null)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // error
  const message = error !== null ? error.message : ''
  const fields = error !== null ? error.fields : []
  const allowable = error !== null ? error.allowable : {}
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  // eslint-disable-next-line no-shadow
  const errorClass = (fields, field) =>
    fields.indexOf(field) !== -1 ? 'error' : null

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowAuth(false)
      route('/', true)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  })

  const register = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${uri}/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pushToken: 'push', name })
      })
      const data = await res.json()

      if (data.error) {
        setError(data.error)
        setShowErrorMessage(true)
      } else {
        setMe(data.me)
        setToken(data.token)
        if (typeof window !== 'undefined') {
          localStorage.setItem('@token', data.token)
        }
        setShowAuth(false)
        route('/', true)
      }

      console.log(data)
      setLoading(false)

      // eslint-disable-next-line no-shadow
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      // className={`auth${showAuth ? ' show' : ''}`}
      className="auth"
    >
      <div className="window" ref={ref}>
        {loading && <Loading absolute />}
        {showErrorMessage && (
          <div
            className="message-error"
            role="presentation"
            onClick={() => setShowErrorMessage(false)}
          >
            {t(message, allowable)}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="name" className={errorClass(fields, 'name')}>
            <input
              className={errorClass(fields, 'name')}
              type="text"
              id="name"
              placeholder="Your name"
              name="chat"
              onChange={e => setName(e.target.value)}
              value={name}
              onFocus={() => setError(null)}
            />
          </label>
        </div>

        <button
          type="button"
          className={error !== null ? 'secondary' : ''}
          onClick={register}
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default connect()(Auth)

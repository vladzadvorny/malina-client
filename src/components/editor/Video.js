import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import urlParser from 'js-video-url-parser/lib/base'
import 'js-video-url-parser/lib/provider/youtube'

import './Video.scss'

import YouTube from '../../vendors/Youtube'

const Video = ({ setVideo, item }) => {
  const [url, setUrl] = useState('')
  const [video, setVideoState] = useState({})
  const [error, setError] = useState(false)
  // const opts = {
  //   height: '384',
  //   width: '512'
  // }

  useEffect(() => {
    const { body } = item
    if (body.id) {
      setVideoState({ ...body })
    }
  })

  const onChange = value => {
    console.log(value)
    setVideoState({})
    const res = urlParser.parse(value)
    if (!res || res.mediaType === undefined || res.mediaType !== 'video') {
      setError(true)
    } else {
      setError(false)
      setVideoState(res)
      setVideo({
        id: res.id,
        provider: 'youtube'
      })
    }

    setUrl(value)
  }

  return (
    <div className="editor-video">
      {video.id === undefined ? (
        <div className="input-group url">
          <label htmlFor="url" className={error ? 'error' : undefined}>
            <input
              className={error ? 'error' : undefined}
              type="text"
              id="url"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              name="url"
              onPaste={e => onChange(e.clipboardData.getData('Text'))}
              onInput={e => onChange(e.target.value)}
              value={url}
              // onFocus={() => setError(null)}
            />
          </label>
        </div>
      ) : (
        <YouTube
          id={video.id}
          // opts={opts}
          // onReady={this._onReady}
        />
      )}

      {error && (
        <span className="error-message">Такого видео не существует</span>
      )}
    </div>
  )
}

export default Video

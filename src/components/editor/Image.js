import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'

import './Image.scss'
import { uri } from '../../constants/config'
import { connect } from '../../store'
import { useLocalization } from '../../utils/localization'

import Dropzone from '../../vendors/Dropzone'
import Loading from '../Loading'

const Image = ({ setImage, item, app: { token } }) => {
  const { t } = useLocalization('editor')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState('')

  useEffect(() => {
    const { body } = item
    if (body.p) {
      setPath(body.p)
    }
  })

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    setError(null)

    if (rejectedFiles.length) {
      setError('Максимальный размер файла 2mb, форматы: .jpg и .png!')
    } else {
      setLoading(true)
      const [file] = acceptedFiles

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`${uri}/uploads`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${token}`
        }),
        body: formData
      })
      const data = await res.json()

      console.log('data', data)

      if (!data.ok) {
        setError(data.error)
      } else {
        setImage({ p: data.filePath })
        setPath(data.filePath)
      }
      setLoading(false)
    }
  }

  return (
    <div className="editor-image">
      {!path ? (
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxSize={2 * 1024 * 1024}
          accept="image/jpeg, image/png"
          className="dropzone"
          disableClick={loading}
        >
          {loading ? <Loading absolute /> : <div>{t('dropzone')}</div>}
          {error && <span className="error-message">{error}</span>}
        </Dropzone>
      ) : (
        <img src={`${uri}/uploads${path}`} alt="" />
      )}
    </div>
  )
}

export default connect(['app'])(Image)

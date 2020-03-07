import { h } from 'preact'

import './Text.scss'

import ContentEditable from '../../vendors/ContentEditable'

const Text = ({ html, setHtml, onBlur }) => {
  // const [_html, _setHtml] = useState('');

  return (
    <div className="editor-text">
      <ul className="buttons">
        <li
          style={{ fontWeight: 'bold' }}
          role="presentation"
          onMouseDown={e => {
            e.preventDefault()
            document.execCommand('bold', false)
          }}
        >
          Bold
        </li>
        <li
          style={{ fontStyle: 'italic' }}
          role="presentation"
          onMouseDown={e => {
            e.preventDefault()
            document.execCommand('italic', false)
          }}
        >
          Italic
        </li>
      </ul>

      <ContentEditable
        className="editable"
        tagName="pre"
        html={html}
        onChange={e => setHtml(e.target.value)}
        onBlur={onBlur}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault()
            document.execCommand('insertHTML', false, '')
          }
        }}
      />
    </div>
  )
}

export default Text

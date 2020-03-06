import { h } from 'preact'

import './Loading.scss'

export default ({ absolute, style = {} }) => {
  let mode = ''
  if (absolute) mode = '-absolute'

  return (
    <div className={`loading${mode}`} style={style}>
      <div className="animation">
        <span />
      </div>
    </div>
  )
}

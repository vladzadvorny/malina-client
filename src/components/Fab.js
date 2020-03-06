import { h } from 'preact'

import './Fab.scss'

export default ({ onClick, children }) => (
  <div className="fab" role="presentation" onClick={onClick}>
    {children}
  </div>
)

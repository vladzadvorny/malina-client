import { h } from 'preact'

import './Header.scss'
import { Star } from '../utils/icons'
import { connect } from '../store'

import PageSelector from './PageSelector'

const Header = ({ me, headerInfo }) => (
  <header className="header">
    <div className="container">
      <div className="left">{!headerInfo && <PageSelector />}</div>

      {headerInfo && <span className="title">{headerInfo.title}</span>}
    </div>

    <div className="right">
      {me.id && (
        <div className="me">
          <Star /> <span>{me.rating}</span>
        </div>
      )}
    </div>
  </header>
)

export default connect(['me'])(Header)

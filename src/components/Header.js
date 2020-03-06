import { h } from 'preact'
import { route } from 'preact-router'

import './Header.scss'
import { Star, ArrowLeft } from '../utils/icons'
import { connect } from '../store'

import PageSelector from './PageSelector'

const Header = ({ me, headerInfo }) => (
  <header className="header">
    <div className="container">
      <div className="left">
        {!headerInfo && <PageSelector />}

        {headerInfo && headerInfo.button === 'back' && (
          <span
            className="back"
            role="presentation"
            onClick={() => {
              route('/', true)
            }}
          >
            <ArrowLeft />
          </span>
        )}

        {headerInfo && <span className="title">{headerInfo.title}</span>}
      </div>

      <div className="right">
        {me.id && (
          <div className="me">
            <Star /> <span>{me.rating}</span>
          </div>
        )}
      </div>
    </div>
  </header>
)

export default connect(['me'])(Header)

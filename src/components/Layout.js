import { h, Fragment } from 'preact'

import './Layout.scss'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ classContainer, children, headerInfo }) => {
  return (
    <>
      <Header headerInfo={headerInfo} />
      <div className="layout">
        <div
          className={`container${classContainer ? ` ${classContainer}` : ''}`}
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout

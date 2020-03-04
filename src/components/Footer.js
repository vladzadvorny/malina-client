import { h } from 'preact'
import { Link } from 'preact-router'

import './Footer.scss'
import { Fire, Search, Comments } from '../utils/icons'

const MenuItem = ({ href, Icon, isActive }) => {
  const props = isActive ? { className: 'active' } : {}

  return (
    <li>
      <Link href={href} {...props}>
        <Icon />
      </Link>
    </li>
  )
}

const Footer = () => {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : ''

  const menu = [
    {
      href: '/',
      icon: Fire,
      isActive: pathname === ''
    },
    {
      href: '/find',
      icon: Search,
      isActive: pathname === 'find'
    },
    {
      href: '/chat-list',
      icon: Comments,
      isActive: pathname === 'chat-list'
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <ul className="menu">
          {menu.map(item => (
            <MenuItem
              key={item.href}
              href={item.href}
              Icon={item.icon}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer

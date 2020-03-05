import { h } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'

import './PageSelector.scss'
import { ChevronDown, Fire, Envira } from '../utils/icons'

const MenuItem = ({ onClick, Icon, name, isActive }) => {
  const props = isActive ? { className: 'active' } : {}

  return (
    <li onClick={onClick} role="presentation" {...props}>
      <Icon /> {name}
    </li>
  )
}

const PageSelector = () => {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [currentItem, setCurrentItem] = useState('hot')

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const handleClick = item => {
    setCurrentItem(item)
    setShow(false)
  }

  const menu = [
    {
      onClick: () => handleClick('hot'),
      icon: Fire,
      name: 'Hot',
      isActive: currentItem === 'hot'
    },
    {
      onClick: () => handleClick('fresh'),
      icon: Envira,
      name: 'Fresh',
      isActive: currentItem === 'fresh'
    }
  ]

  return (
    <div className="page-selector" ref={ref}>
      <span onClick={() => setShow(true)} role="presentation">
        {`${currentItem[0].toUpperCase()}${currentItem.slice(1)}`}{' '}
        <ChevronDown />
      </span>

      <ul className={`page-selector-content${show ? ' show' : ''}`}>
        {menu.map(item => (
          <MenuItem
            key={item.href}
            onClick={item.onClick}
            Icon={item.icon}
            name={item.name}
            isActive={item.isActive}
          />
        ))}
      </ul>
    </div>
  )
}

export default PageSelector

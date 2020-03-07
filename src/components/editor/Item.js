import { h } from 'preact'

import './Item.scss'
import { Times, ChevronUp, ChevronDown } from '../../utils/icons'

import Text from './Text'
import Image from './Image'

const Item = ({ index, length, removeItem, item, changeItem, moveItem }) => {
  return (
    <div className="item">
      <div className="left">
        {item.type === 'text' && (
          <Text
            html={item.body}
            setHtml={html => {
              changeItem({
                ...item,
                body: html.replace(/(<\/?(?:a|b|i)[^>]*>)|<[^>]+>/gi, '$1')
              })
            }}
            onBlur={console.log}
          />
        )}

        {item.type === 'image' && (
          <Image
            item={item}
            setImage={image =>
              changeItem({
                ...item,
                body: image
              })
            }
          />
        )}
      </div>

      <div className="right">
        <span
          className="close"
          role="presentation"
          onClick={() => removeItem(index)}
        >
          <Times />
        </span>

        <div className="up-down">
          <span
            className={index === 0 ? 'disable' : ''}
            role="presentation"
            onClick={() => moveItem(index, index - 1)}
          >
            <ChevronUp />
          </span>
          <span
            className={index === length - 1 ? 'disable' : ''}
            role="presentation"
            onClick={() => moveItem(index, index + 1)}
          >
            <ChevronDown />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Item

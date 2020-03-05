import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import './Post.scss'
import { ChevronUp, ChevronDown, Comment } from '../utils/icons'

const Post = () => {
  const [arr, setArr] = useState([])

  useEffect(() => {
    setArr(
      Array.from({ length: 20 }, () =>
        Math.random()
          .toString(36)
          .substring(2)
      )
    )
  }, [])

  return (
    <div className="post">
      {/* top */}
      <div className="top">
        <h2>
          <a href="/">Какой-нибудь заголовок поста</a>
        </h2>
        <span className="meta">
          <a href="/" className="author">
            Автор
          </a>
          <span className="time">10 минут назад</span>
        </span>
      </div>

      {/* body */}
      <div className="body">.</div>

      <div className="bottom">
        {/* rating */}
        <div className="rating">
          <span className="up">
            <ChevronUp />
          </span>
          <span className="count">{Math.floor(Math.random() * 400)}</span>
          <span className="down">
            <ChevronDown />
          </span>
        </div>

        {/* tags */}
        <ul className="tags">
          {arr.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* comment-count */}
        <div className="comment-count">
          <Comment />
          <span className="count">{Math.floor(Math.random() * 400)}</span>
        </div>
      </div>
    </div>
  )
}

export default Post

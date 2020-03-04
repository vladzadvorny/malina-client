/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/self-closing-comp */
// https://github.com/FortAwesome/Font-Awesome/tree/e05a1219784935ff5beb6bfb17cdc86bc848d0bb/svgs/solid
import { h } from 'preact'

const Svg = ({ children }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height="1em"
      width="1.4em"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
    >
      {children}
    </svg>
  )
}

export const Plus = () => (
  <Svg>
    <path
      fill="currentColor"
      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
    ></path>
  </Svg>
)

import app from './app'
import count from './count'
import me from './me'

export default store => ({
  ...app(store),
  ...count(store),
  ...me(store)
})

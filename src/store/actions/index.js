import count from './count'

export default store => ({
  ...count(store)
})

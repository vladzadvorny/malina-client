// eslint-disable-next-line no-unused-vars
const countActions = store => ({
  increment(state) {
    return { count: state.count + 1 }
  }
})

export default countActions

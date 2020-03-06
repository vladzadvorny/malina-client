// eslint-disable-next-line no-unused-vars
const appActions = store => ({
  setShowAuth({ app }, showAuth) {
    return { app: { ...app, showAuth } }
  },
  setToken({ app }, token) {
    return { app: { ...app, token } }
  }
})

export default appActions

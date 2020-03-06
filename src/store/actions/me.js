import { uri } from '../../constants/config'

const meActions = store => ({
  // set me
  setMe(state, me) {
    return { me }
  },
  // fetch me
  async fetchMe({ app }) {
    // store.setState({ app: { ...app, loading: true } })

    if (app.token) {
      try {
        const res = await fetch(`${uri}/me`, {
          headers: new Headers({
            Authorization: `Bearer ${app.token}`
          })
        })
        const data = await res.json()

        if (data.me) {
          store.setState({ me: data.me, app: { ...app, loading: false } })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      store.setState({ app: { ...app, loading: false } })
    }
  }
})

export default meActions

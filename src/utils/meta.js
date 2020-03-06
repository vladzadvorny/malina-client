/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import { h, createContext } from 'preact'
import { useContext } from 'preact/hooks'

export const Context = createContext({})

// export const Consumer = Context.Consumer

export const MetaProvider = ({ children, context }) => {
  return <Context.Provider value={context}>{children}</Context.Provider>
}

export const useMeta = meta => {
  if (typeof window !== 'undefined' && meta.title) {
    document.title = meta.title
  }

  if (typeof window !== 'undefined') return

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(Context)

  Object.keys(meta).forEach(key => {
    context[key] = meta[key]
  })
}

export const createTags = context => {
  const tags = []

  if (context.title) {
    tags.push(`<title>${context.title}</title>`)
  }

  if (context.description) {
    tags.push(`<meta name="description" content="${context.description}" />`)
  }

  return tags.join('')
}

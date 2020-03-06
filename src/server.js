import { h } from 'preact'
import express from 'express'
import serialize from 'serialize-javascript'
import render from 'preact-render-to-string'
import { Provider } from 'unistore/preact'

import { assetsByChunkName } from '../dist-ssr/public/stats.json'
import createStore from './store'
import { port } from './constants/config'
import { LocalizationProvider } from './utils/localization'

import App from './App'

global.fetch = require('node-fetch')

const app = express()

app.use(express.static('dist-ssr/public'))

app.get('*', (req, res) => {
  // const params = req.params[0].split('/')

  // [ '', 'blog' ]
  // [ '', 'ru', 'blog' ]
  // [ '', 'ru', 'blog', '1' ]

  const route = '/'
  res.send(renderer(route, {}))
})

// listen
app.listen({ port }, () => {
  console.log(`✓ Started SSR server at http://localhost:${port}`)
})

// renderer
function renderer(route, state = {}) {
  const rendered = render(
    <Provider store={createStore(state)}>
      <LocalizationProvider>
        <App route={route} />
      </LocalizationProvider>
    </Provider>
  )

  let files = []

  Object.keys(assetsByChunkName).forEach(key => {
    if (Array.isArray(assetsByChunkName[key])) {
      files = files.concat(assetsByChunkName[key])
    } else {
      files.push(assetsByChunkName[key])
    }
  })

  const scripts = files.filter(f => f.endsWith('.js'))
  const stylesheets = files.filter(f => f.endsWith('.css'))

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />      
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
      ${stylesheets
        .map(f => `<link rel="stylesheet" type="text/css" href="/${f}" />`)
        .join('\n')}
    </head>

    <body>
    ${rendered}

    ${scripts.map(f => `<script src="/${f}"></script>`).join('\n')}

      <script>
          window.__STATE__ = ${serialize(state).replace(/</g, '\\u003c')}
      </script>
    </body>
  </html>`
}

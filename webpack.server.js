/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const merge = require('webpack-merge')
const webpackNodeExternals = require('webpack-node-externals')
// const InjectPlugin = require('webpack-inject-plugin').default

const baseConfig = require('./webpack.base.js')

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  mode: 'production',

  // Tell webpack the root file of our
  // server application
  entry: './src/server.js',
  // We don't serve bundle.js for server, so we can use dynamic external imports
  externals: [webpackNodeExternals()],

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist-ssr')
  },
  optimization: {
    minimize: false // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] if you want to customize it.
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: 'null-loader'
      }
    ]
  }
}

module.exports = merge(baseConfig, config)

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// .BundleAnalyzerPlugin;

const baseConfig = require('./webpack.base')

const config = {
  mode: 'production',
  entry: './src/client.js',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist-ssr', 'public')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  // devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin([
      {
        from: 'public',
        ignore: ['index.html']
      }
    ]),
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(),
    new StatsWriterPlugin({
      // filename: 'stats.json',
      stats: {
        all: false,
        assets: true
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css'
    })
  ]
}

module.exports = merge(baseConfig, config)

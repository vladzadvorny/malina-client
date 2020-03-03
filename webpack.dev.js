/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  entry: './src/client.js',
  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        IS_CORDOVA: false
      }
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      templateParameters: {
        isCordova: false
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './public',
    host: '192.168.1.53',
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  devtool: 'inline-source-map'
};

module.exports = merge(baseConfig, config);

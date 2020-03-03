/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base');

const config = {
  mode: 'production',
  entry: './src/client.js',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist-cordova'),
    publicPath: ''
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
      }),
      new OptimizeCSSAssetsPlugin({})
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
    new BundleAnalyzerPlugin(),
    // new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        IS_CORDOVA: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css'
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      templateParameters: {
        isCordova: true
      }
    })
  ]
};

module.exports = merge(baseConfig, config);

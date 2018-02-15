
var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.prod.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
    plugins: [
        new UglifyJsPlugin()
    ],
  module: {
    loaders: [
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },{
      test: /\.tsx?$/,
      use: [
        {
          loader: "awesome-typescript-loader"
        },
      ],
      include: path.join(__dirname, 'src')
    }, {
        test: /\.(jpg|png|svg)$/,
        use: {
            loader: "url-loader",
            options: {
                limit: 25000,
            },
        },
    },]
  }
};
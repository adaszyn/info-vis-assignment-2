
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
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
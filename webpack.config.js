// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'receipt-4364324.html', // example file name
      chunks: ['receipt-4364324'], // specify which chunk to include
    }),
    // add more HtmlWebpackPlugin instances for each receipt
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
};
module.exports = {
  context: __dirname + '/app',
  entry: './web_modules/entry',
  output: {
    path: __dirname + '/app/assets/javascripts',
    filename: 'plottr.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx-loader'
    }]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: __dirname + '/app',
  }
};

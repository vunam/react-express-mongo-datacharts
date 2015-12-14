module.exports = {
  entry: {
    javascript: "./src/client/app.js",
    html: "./src/client/index.html"
  },
  output: {
    filename: "app.js",
    path: "./dist",
  },
  module: {
	  loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]"},
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'] },
      { test: /\.less$/, loader: 'style!css!less' },
	  ]
	}
}
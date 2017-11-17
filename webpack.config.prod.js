const webpack = require("webpack");

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: __dirname + "/public/dist/",
    filename: "main.js",
    publicPath: "/dist"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    contentBase: "public/",
    historyApiFallback: true
  }
};

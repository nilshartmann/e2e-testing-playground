const webpack = require("webpack");

module.exports = {
  entry: ["babel-polyfill", "react-hot-loader/patch", "./src/main.js"],
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
  devtool: "inline-source-map",
  devServer: {
    contentBase: "public/",
    hot: true
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
};

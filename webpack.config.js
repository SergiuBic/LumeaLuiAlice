const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
   
       {
         test: /\.css$/, 
         use: [ 'style-loader', 'css-loader' ]
       }
   ]
},
  resolve: {
    fallback: {
        fs: false,
    }
},
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {},
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
  })
  ],
};

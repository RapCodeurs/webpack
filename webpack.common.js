// const { watch } = require("fs/promises");
const path = require("path");
const { Generator } = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
// const { clear } = require("console");

module.exports = {
  entry: {
    index: "./src/index.js",
    video: "./src/video.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]-[contenthash].js",
    clean: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        generator: {
          filename: "images/[name]-[contenthash][ext]",
        },
      }, //end images rule
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        generator: {
          filename: "fonts/[name]-[contenthash][ext]",
        },
      }, // end font rule
      {
        test: /\.(mp4)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash][ext]",
        },
      }, //end video rule
    ], // end rules array
  }, // end module
  plugins: [
    new htmlWebpackPlugin({
      template: "src/templates/index.html",
      filename: "index.html",
      minify: false,
      chunks: ["index"],
    }),
    new htmlWebpackPlugin({
      template: "src/templates/video.html",
      filename: "video.html",
      minify: false,
      chunks: ["video"],
    }),
  ],
}; // end module.exports

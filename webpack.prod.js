const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: miniCssExtractPlugin.loader },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          "sass-loader",
        ],
      }, // end CSS | SCSS rule
    ],
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
    }),
  ],
  optimization: {
    minimizer: [new cssMinimizerPlugin(), new terserWebpackPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
});

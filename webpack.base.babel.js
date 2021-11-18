/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
process.noDeprecation = true;

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), "dist"),
      filename: "personlist.js",
      publicPath: "",
    },
    options.output
  ), // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(le|c)ss$/,
        include: /src/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      // {
      //   test: /\.json$/,
      //   use: 'json-loader'
      // },
    ],
  },
  plugins: options.plugins.concat([
    new CleanWebpackPlugin([path.resolve(process.cwd(), "dist")]),
    new webpack.ProvidePlugin({
      fetch: "exports-loader?self.fetch!isomorphic-fetch",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]),
  resolve: {
    modules: ["app", "node_modules"],
    extensions: [".js", ".jsx", ".less", ".css", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
  devtool: options.devtool,
  target: "web", // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  optimization: {
    runtimeChunk: true,
    sideEffects: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
        },
        paycorVendor: {
          test: /[\\/]node_modules[\\/](@paycor)[\\/]/,
          name: "paycor",
          //reuseExistingChunk: true
        },
      },
    },
    usedExports: true,
  },
});

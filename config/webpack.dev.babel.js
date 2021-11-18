/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = require("../webpack.base.babel")({
  mode: "development",
  entry: {
    main: [path.join(process.cwd(), "src/app/index.jsx")],
  },
  // Don't use hashes in dev mode for better performance
  output: {
    chunkFilename: "[name].chunk.js",
  },

  // Add development plugins
  plugins: [
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
    // new HtmlWebpackPlugin({
    //   template: "public/index.html",
    //   inject: true,
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../public/index.html'),
      // buildVersion: build.version
    }),
    new MiniCssExtractPlugin({ filename: "personlist.css" }),
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',

  // performance: {
  //   hints: false,
  // },
});

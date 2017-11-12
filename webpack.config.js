var webpack = require('webpack');

var path = require('path');
var APP_DIR = path.resolve(__dirname, 'client');
var BUILD_DIR = path.resolve(__dirname, 'server/static/javascript');

var config = {
  entry: APP_DIR + '/main.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool: "#cheap-module-source-map.",  // #eval-source-map" #cheap-module-source-map."
  module: {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude: /node_modules/,
        include : APP_DIR,
        loader : 'babel-loader',
        options: {
            babelrc: false,
            presets:["env", "react", "stage-2"]
        }
      }
    ]
  }
};

module.exports = config;
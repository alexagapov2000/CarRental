
'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./wwwroot/"

module.exports = {
    entry: [
        srcFolder + "index.jsx",
        'babel-polyfill',
        //'./test.js',
    ],
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        publicPath: 'assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        rules: [
            {
                //test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            }
        ],
        loaders: [
            {
                //test: /\.jsx?$/,
                loader: 'babel',
            }
        ]
    },
    plugins: [
    ]
};

/*
module.exports = {
    entry: ['babel-polyfill', './test.js'],
  
    output: {
      filename: 'bundle.js'       
    },
  
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel', }
      ]
    }
  };
  */
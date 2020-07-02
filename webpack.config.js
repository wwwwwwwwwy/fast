// webpack.config.js
'use strict';
const path = require('path');
const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
module.exports = (env = {}) => {
    const config = {
        node: {
            // console: true, 
            // global: false,
            // process: true,
            __filename: true,
            __dirname: false,
            // Buffer: true,
            // setImmediate: true,
            // path: true
        },
        context: path.resolve(__dirname),
        entry: ['./src/main.ts'],
        output: {
            path: path.resolve(__dirname, 'meos'),
            filename: 'app.js'
        },
        mode: env.development ? 'development' : 'production',
        target: 'node',
        devtool: env.development ? 'source-map' : false,
        resolve: {
            // Tells Webpack what files to watch      
            extensions: ['.ts', '.js'],
            modules: ['node_modules', 'src', 'package.json'],
        },
        module: {
            rules: [
                {
                    exclude: path.resolve(__dirname, "config"),
                    test: /\.ts$/,
                    use: 'ts-loader',
                },
            ],
        },
        plugins: [
            new WebpackBar(),
            new webpack.DefinePlugin({ "global.GENTLY": false }),
            // new CleanWebpackPlugin(),
            new CopyPlugin([
                { from: "src/config/", to: './' }
            ]),
        ] // required for config.plugins.push(...);
    };
    if (env.nodemon) {
        config.watch = true;
        config.plugins.push(new NodemonPlugin());
    }
    return config;
};

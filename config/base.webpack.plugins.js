/* global require, module, __dirname */
/* eslint-disable space-unary-ops */

/**
 * Plugins used by webpack bundler
 */
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.common.js');
const plugins = [];

/**
 * Writes bundles to distribution folder.
 *
 * @type {var}
 */
const WriteFileWebpackPlugin = new (require('write-file-webpack-plugin'))();
plugins.push(WriteFileWebpackPlugin);

/**
 * Copys entry html to distribution folder
 *
 * @type {var}
 */
const HtmlWebpackPlugin = new (require('html-webpack-plugin'))({
    title: 'Home',
    filename: 'index.html',
    chunks: [ 'App', 'vendor' ],
    template: path.resolve(__dirname, '../src/index.html')
});
plugins.push(HtmlWebpackPlugin);

const LogoutPage = new (require('html-webpack-plugin'))({
    title: 'Logged out',
    filename: 'logout.html',
    chunks: [ 'Logout', 'vendor' ],
    template: path.resolve(__dirname, '../src/not-signed.html')
});
plugins.push(LogoutPage);

const NotFound = new (require('html-webpack-plugin'))({
    title: 'Not found',
    filename: '404.html',
    chunks: [ 'NotFound', 'vendor' ],
    template: path.resolve(__dirname, '../src/not-signed.html')
});
plugins.push(NotFound);

const Maintenance = new (require('html-webpack-plugin'))({
    title: 'Maintenance',
    filename: 'maintenance.html',
    chunks: [ 'Maintenance', 'vendor' ],
    template: path.resolve(__dirname, '../src/not-signed.html')
});
plugins.push(Maintenance);

const CheckSSO = new (require('html-webpack-plugin'))({
    title: 'checkSSO',
    filename: 'silent-check-sso.html',
    chunks: [ '' ],
    template: path.resolve(__dirname, '../src/silent-check-sso.html')
});
plugins.push(CheckSSO);

/**
 * Source maps
 * @type {var}
 */
const SourceMapsPlugin = new webpack.SourceMapDevToolPlugin({
    test: /\.js/i,
    exclude: /(node_modules|bower_components)/i,
    filename: `sourcemaps/[name].js.map`
});
plugins.push(SourceMapsPlugin);

/**
 * Cleans distribution folder.
 * @type {[type]}
 */
const CleanWebpackPlugin = new (require('clean-webpack-plugin'))();
plugins.push(CleanWebpackPlugin);

/**
 * Selects the specific lodash functions.
 *
 * @type {var}
 */
const LodashWebpackPlugin = new (require('lodash-webpack-plugin'))({ currying: true, flattening: true, placeholders: true });
plugins.push(LodashWebpackPlugin);

/**
 * Optimizes bundle size
 *
 * @type {var}
 */
//const AggressiveSplittingPlugin = new webpack.optimize.AggressiveSplittingPlugin({
//    minSize: 30000,
//    maxSize: 50000
//});
// plugins.push(AggressiveSplittingPlugin);

/**
 * Writes final css to file
 */
const ExtractCssWebpackPlugin = new (require('mini-css-extract-plugin'))({
    chunkFilename: 'css/[name].css',
    filename: 'css/[name].css'
});
plugins.push(ExtractCssWebpackPlugin);

/**
 * Copies files from the specified locations to the corresponding destinations.
 */
const CopyFilesWebpackPlugin = new (require('copy-webpack-plugin'))([
    { from: path.resolve(__dirname, '../static/images'), to: 'images' },
    { from: path.resolve(__dirname, '../robots.txt') }
]);
plugins.push(CopyFilesWebpackPlugin);

/**
 * Replaces any @@env in the html files with config.appDeployment value.
 * This handles the path being either insights or insightsbeta in the esi:include.
 */
const HtmlReplaceWebpackPlugin = new(require('html-replace-webpack-plugin'))([{
    pattern: '@@env',
    replacement: config.appDeployment
}]);
plugins.push(HtmlReplaceWebpackPlugin);

module.exports = { plugins };

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.common.js');

const rules = [
    { loader: 'source-map-loader' },
    { loader: 'babel-loader' }
];

const webpackConfig = {
    devtool: false,
    entry: {
        App: config.paths.entry,
        Logout: config.paths.logout,
        NotFound: config.paths.notFound,
        Maintenance: config.paths.maintenance
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: config.paths.public,
        publicPath: config.paths.publicPath,
        chunkFilename: 'js/[name].[hash].js'
    },
    module: {
        rules: [{
            test: /src\/.*\.js$/,
            exclude: /(node_modules)/i,
            use: rules
        }, {
            test: /\.s?[ac]ss$/,
            use: [
                process.env.NODE_ENV === 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }, {
            test: /\.(woff(2)?|ttf|jpg|png|eot|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        }, {
            test: /app.*\.html$/,
            loader: 'raw'
        }]
    }
};

module.exports = webpackConfig;

// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const { UniversalFederationPlugin } = require('@module-federation/node');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const searchIgnoredStyles = require('@redhat-cloud-services/frontend-components-config-utilities/search-ignored-styles');

const createDynamicPlugin = (isServer) =>
  new UniversalFederationPlugin({
    isServer,
    name: 'ssrLanding',
    library: isServer
      ? { type: 'commonjs-module' }
      : { type: 'var', name: 'ssrLanding' },
    filename: isServer ? 'ssr-landing-server.js' : 'ssr-landing.js',
    shared: [
      {
        react: {
          eager: false,
          import: false,
          singleton: true,
          requiredVersion: '*',
        },
        'react-dom': {
          eager: false,
          import: false,
          singleton: true,
          requiredVersion: '*',
        },
        'react-router-dom': {
          eager: false,
          import: false,
          singleton: true,
          requiredVersion: '*',
        },
        '@scalprum/react-core': {
          eager: false,
          import: false,
          singleton: true,
          requiredVersion: '*',
        },
      },
    ],
    exposes: {
      './RootApp': path.resolve(__dirname, './src/moduleEntries/AppEntry.js'),
    },
  });

const createConfig = (isServer = false) => ({
  entry: path.resolve(__dirname, './src/moduleEntries/AppEntry.js'),
  mode: 'development',
  target: isServer ? false : 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8005/',
    globalObject: 'this',
    chunkFilename: isServer ? 'server-[name].chunk.js' : '[name].chunk.js',
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    createDynamicPlugin(isServer),
    // new PatchEntryCallbackPlugin('ssrRemote', 'ssrRemote')
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
            },
          },
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            /**
             * Second sass loader used for scoping the css with class name.
             * Has to be included as second in order to re-scope already compiled sass files.
             * Second loader is required to avoid scoping mixins, includes and other sass partials. We want to only scope the CSS output.
             */
            loader: 'sass-loader',
            options: {
              additionalData: function (content, loaderContext) {
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);
                /**
                 * Add app class context for local style files.
                 * Context class is equal to app name and that class ass added to root element via the chrome-render-loader.
                 */
                if (relativePath.match(/^src/)) {
                  return `.landing {\n${content}\n}`;
                }

                return content;
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    alias: {
      ...searchIgnoredStyles(__dirname),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
});

module.exports = () => {
  return [createConfig(), createConfig(true)];
};

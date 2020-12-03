const path = require('path');

function mutateConfig(webpackConfig) {

    const entry = process.env.NODE_ENV === 'production' ?
        path.resolve(__dirname, '../src/entry.js') :
        path.resolve(__dirname, '../src/entry-dev.js');

    const logout = path.resolve(__dirname, '../src/logout.js');

    const notFound = path.resolve(__dirname, '../src/not-found.js');

    const maintenance = path.resolve(__dirname, '../src/maintenance.js');

    /**
     * There is multiple entry points
     */
    webpackConfig.entry = {
        App: entry,
        Logout: logout,
        NotFound: notFound,
        Maintenance: maintenance
    };
    /**
     * This is requried due to the import of fedora svg in Hero.
     * Css loader will resolve all relative URLS and add ./ prefix.
     * That causes the URL to be resolved at build time locally and crashes the build.
     * We could add the baseUri to the css, but we don't have it at build time (ci.cloud, qa.cloud, cloud, beta, etc.).
     * Setting options { url: false } turns off that behavior.
     * We can further specify which url to resolve if we have some landning page static assets later on.
     */

    const roleIndex = webpackConfig.module.rules.findIndex(({ use }) => {
        if (use && Array.isArray(use)) {
            const cssLoader = use.find(loader => typeof loader === 'object' && loader.loader === 'css-loader');
            if (cssLoader) {
                return true;
            }
        }

        return false;
    });
    const loaderIndex = webpackConfig.module.rules[roleIndex].use.findIndex(loader => typeof loader === 'object' && loader.loader === 'css-loader');
    webpackConfig.module.rules[roleIndex].use[loaderIndex].options = { url: false };

    /**
     * We also require html loader to parse multiple entries
     */
    webpackConfig.module.rules.push({
        test: /app.*\.html$/,
        loader: 'raw'
    });
    return webpackConfig;
}

module.exports = mutateConfig;

/**
 *
 */

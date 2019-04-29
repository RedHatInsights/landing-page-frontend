/* global require, module, __dirname, process */

const path = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
    branch: true
});
const entry = process.env.NODE_ENV === 'production' ?
    path.resolve(__dirname, '../src/entry.js') :
    path.resolve(__dirname, '../src/entry-dev.js');

const logout = process.env.NODE_ENV === 'production' ?
    path.resolve(__dirname, '../src/logout.js') :
    path.resolve(__dirname, '../src/logout-dev.js');

const notFound = process.env.NODE_ENV === 'production' ?
    path.resolve(__dirname, '../src/not-found.js') :
    path.resolve(__dirname, '../src/not-found-dev.js');

const gitBranch = process.env.TRAVIS_BRANCH || process.env.BRANCH || gitRevisionPlugin.branch();
const betaBranhces = [ 'master', 'qa-beta', 'ci-beta', 'prod-beta' ];
const appDeployment = (process.env.NODE_ENV === 'production' && betaBranhces.includes(gitBranch)) ?
    '/beta/apps' :
    '/apps';

const publicPath = `${appDeployment}/landing/`;

/* eslint-disable no-console */
console.log('~~~Using variables~~~');
console.log(`Current branch: ${gitBranch}`);
console.log(`TRAVIS_BRANCH: ${process.env.TRAVIS_BRANCH}`);
console.log(`BRANCH: ${process.env.BRANCH}`);
console.log(`Using deployments: ${appDeployment}`);
console.log(`Public path: ${publicPath}`);
console.log('~~~~~~~~~~~~~~~~~~~~~');
/* eslint-enable no-console */

module.exports = {
    paths: {
        entry,
        logout,
        notFound,
        public: path.resolve(__dirname, '../dist'),
        src: path.resolve(__dirname, '../src'),
        pages: path.resolve(__dirname, '../src/pages'),
        static: path.resolve(__dirname, '../static'),
        publicPath
    },
    appDeployment
};

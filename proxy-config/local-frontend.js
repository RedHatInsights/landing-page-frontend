/*global module*/

const localhost = (process.env.PLATFORM === 'linux') ? 'localhost' : 'host.docker.internal';

module.exports = {
    routes: {
        '/apps/landing/': { host: `https://${localhost}:8002` },
        '/': { host: `https://${localhost}:8002` }
    }
};

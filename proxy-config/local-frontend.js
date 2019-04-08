/*global module, process*/

const localhost = (process.env.PLATFORM === 'linux') ? 'localhost' : 'host.docker.internal';

module.exports = {
    routes: {
        '/api': { host: 'https://ci.cloud.paas.upshift.redhat.com' },
        '/apps/landing/': { host: `https://${localhost}:8002` },
        '/': { host: `https://${localhost}:8002` }
    }
};

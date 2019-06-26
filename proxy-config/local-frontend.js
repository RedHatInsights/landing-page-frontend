/*global module, process*/

module.exports = {
    routes: {
        '/apps/landing/': { host: 'https://localhost:8002' },
        '/apps/': { host: 'PORTAL_BACKEND_MARKER' },
        '/rhev/': { host: 'PORTAL_BACKEND_MARKER' },
        '/insights/': { host: 'PORTAL_BACKEND_MARKER' },
        '/openshift/': { host: 'PORTAL_BACKEND_MARKER' },
        '/hybrid/': { host: 'PORTAL_BACKEND_MARKER' },
        '/api/': { host: 'PORTAL_BACKEND_MARKER' },
        '/': { host: 'https://localhost:8002' },
        '/404': { host: 'https://localhost:8002' },
        '/logout': { host: 'https://localhost:8002' },
        '/apps/landing/404': { host: 'https://localhost:8002' },
        '/apps/landing/logout': { host: 'https://localhost:8002' },
    }
};
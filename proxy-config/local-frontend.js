/*global module, process*/

module.exports = {
    routes: {
        '/apps/landing/': { host: 'https://localhost:8002' },
        '/apps/': { host: 'PORTAL_BACKEND_MARKER' },
        '/rhev/': { host: 'PORTAL_BACKEND_MARKER' },
        '/insights/': { host: 'PORTAL_BACKEND_MARKER' },
        '/openshift/': { host: 'PORTAL_BACKEND_MARKER' },
        '/cost-management/': { host: 'PORTAL_BACKEND_MARKER' },
        '/api/': { host: 'PORTAL_BACKEND_MARKER' },
        '/migrations/': { host: 'PORTAL_BACKEND_MARKER' },
        '/ansible/': { host: 'PORTAL_BACKEND_MARKER' },
        '/subscriptions/': { host: 'PORTAL_BACKEND_MARKER' },
        '/': { host: 'https://localhost:8002' },
        '/maintenance': { host: 'https://localhost:8002' },
        '/404': { host: 'https://localhost:8002' },
        '/beta/': { host: 'PORTAL_BACKEND_MARKER' },
        '/beta/apps/': { host: 'PORTAL_BACKEND_MARKER' },
        '/config/': { host: 'PORTAL_BACKEND_MARKER' },
        '/beta/config/': { host: 'PORTAL_BACKEND_MARKER' },
    }
};

const FECMapper = {
  SkeletonSize: 'Skeleton',
  PageHeaderTitle: 'PageHeader',
};

module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    'lodash',
    [
      'transform-imports',
      {
        '@redhat-cloud-services/frontend-components': {
          transform: (importName) =>
            `@redhat-cloud-services/frontend-components/components/esm/${
              FECMapper[importName] || importName
            }`,
          preventFullImport: false,
          skipDefaultConversion: true,
        },
      },
      'frontend-components',
    ],
    [
      'transform-imports',
      {
        '@redhat-cloud-services/frontend-components-notifications': {
          transform: (importName) =>
            `@redhat-cloud-services/frontend-components-notifications/esm/${importName}`,
          preventFullImport: true,
        },
      },
      'frontend-notifications',
    ],
  ],
};

module.exports = {
  extends: '@redhat-cloud-services/eslint-config-redhat-cloud-services',
  globals: {
    insights: 'readonly',
    shallow: 'readonly',
    render: 'readonly',
    mount: 'readonly',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 1,
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 1,
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
};

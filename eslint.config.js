/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('eslint/config');
const fecPlugin = require('@redhat-cloud-services/eslint-config-redhat-cloud-services');
const tsParser = require('@typescript-eslint/parser');
const tseslint = require('typescript-eslint');

module.exports = defineConfig(
  fecPlugin,
  {
    languageOptions: {
      globals: {
        insights: 'readonly',
        shallow: 'readonly',
        render: 'readonly',
        mount: 'readonly',
      },
    },
    ignores: ['node_modules/*', 'dist/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['cypress/**/*.ts', 'cypress/**/*.tsx', 'cypress/**/*.js'],
    languageOptions: {
      parser: tsParser,
      globals: {
        cy: 'readonly',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'after-used' }],
    },
  },
);
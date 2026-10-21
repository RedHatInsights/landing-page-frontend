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
    ignores: ['node_modules/*', 'dist/*', 'storybook-static/*', 'coverage/*', 'src/demoData/*'],
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
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'src/**/__tests__/**',
      '**/*.test.*',
      '**/*.stories.*',
      // PdfEntry is loaded standalone by the PDF generator service; the
      // host does not guarantee react-intl, so it stays untranslated.
      'src/moduleEntries/PdfEntry.tsx',
    ],
    plugins: {
      i18next: require('eslint-plugin-i18next'),
    },
    rules: {
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'jsx-only',
          'jsx-attributes': {
            exclude: ['className', 'styleName', 'style', 'type', 'key', 'id', 'width', 'height', 'name', 'href', 'to', 'path', 'target', 'variant', 'component', 'form', 'fieldId', 'filterId', 'widgetId', 'ouiaId', 'data-testid', 'testId', 'autoFocus', 'headingLevel', 'size', 'sx', 'direction', 'position', 'align', 'icon', 'variantPrefix', 'isCompact', 'locale', 'defaultLocale', 'aria-describedby', 'aria-labelledby', 'titleIconVariant', 'iconVariant', 'eventKey', 'labelId', 'serviceName', 'validated', 'rel', 'role', 'popperProps', 'appendTo', 'dataLabel', 'expandId', 'titleId', 'apiPath', 'spellCheck', 'md', 'sm', 'lg', 'xl', 'xl2', 'breakpoint', 'collapseListedFiltersBreakpoint', 'color', 'url'],
          },
          words: {
            exclude: [/^alignItems[A-Z]/, /^spaceItems[A-Z]/, /^justifyContent[A-Z]/, /^flexWrap[A-Z]/, /^inset[A-Z]/, /^spacer[A-Z]/, /^gap[A-Z]/, /^flex_[0-9]+$/, /^flexDefault$/, /^flexNone$/, /^grow$/, /^shrink$/, /^noPadding$/, /^nowrap$/, /^compact$/, /^alignSelf[A-Z]/, /^100%$/, /^\d+px$/, /^right$/, /^left$/, /^center$/, /^top$/, /^bottom$/, /^danger$/, /^success$/, /^warning$/, /^info$/, /^default$/, /^text$/, /^checkbox$/, /^radio$/, /^date$/, /^time$/, /^inset[A-Z0-9]/, /^end$/, /^start$/, /^https?:\/\//, /^#[0-9A-Fa-f]{3,8}$/],
          },
          callees: {
            exclude: ['join', 'includes', 'openWizard', 'open'],
          },
        },
      ],
    },
  },
);
const reactHooks = require('eslint-plugin-react-hooks');
/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('eslint/config');
const fecPlugin = require('@redhat-cloud-services/eslint-config-redhat-cloud-services');
const tsParser = require('@typescript-eslint/parser');
const tseslint = require('typescript-eslint');
const experienceUi = require('experience-ui-governance/eslint-plugin');

// Shared Experience UI governance rules.
// https://github.com/RedHatInsights/experience-ui-governance
//
// We take the PatternFly import restrictions and the story/test rules. The
// other entries in `configs.recommended` (useChrome -> useAppServices,
// Link -> AppLink, useFlag -> src/capabilities/) point at abstractions this
// repo does not have, so enabling them here would emit errors whose fix
// instructions lead nowhere. Revisit if those abstractions ever land.
const patternflyImportPaths =
  experienceUi.configs.recommended.restrictedImportPaths.filter((path) =>
    path.name.startsWith('@patternfly/'),
  );
const storyImportPaths = experienceUi.configs.stories.restrictedImportPaths;

// Repo-local restrictions. These two are team-wide in spirit — governance
// asserts both in prose (standards/architecture.md, standards/data-layer.md)
// but ships no rule for either — so they are candidates to upstream into
// `configs/recommended` once they have proven out here.
const localImportPaths = [
  {
    name: 'redux',
    message:
      'No global client state. This app has one chrome-owned route and no store; widget-local useState is sufficient. See AGENTS.md #14.',
  },
  {
    name: 'react-redux',
    message:
      'No global client state. This app has one chrome-owned route and no store; widget-local useState is sufficient. See AGENTS.md #14.',
  },
  {
    name: '@reduxjs/toolkit',
    message:
      'No global client state. This app has one chrome-owned route and no store; widget-local useState is sufficient. See AGENTS.md #14.',
  },
  {
    name: 'redux-promise-middleware',
    message:
      'No global client state. This app has one chrome-owned route and no store; widget-local useState is sufficient. See AGENTS.md #14.',
  },
];

module.exports = defineConfig(
  {
    plugins: { 'react-hooks': reactHooks },
    rules: { 'react-hooks/exhaustive-deps': 'error' },
  },
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
      '@typescript-eslint/no-explicit-any': 'error',
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
      '@typescript-eslint/no-explicit-any': 'error',
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
  {
    // Global PatternFly imports pull the whole library into every federated
    // bundle, and this repo ships 13 of them. Use dynamic sub-paths.
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: [...patternflyImportPaths, ...localImportPaths] },
      ],
    },
  },
  {
    // Server state belongs in TanStack Query behind a client in src/data/api/,
    // not hand-rolled fetch + useEffect + useState. See AGENTS.md #7.
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'src/**/__tests__/**',
      '**/*.test.*',
      '**/*.stories.*',
      'src/data/mocks/**',
    ],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='fetch']",
          message:
            'Do not call fetch() directly. Server state uses TanStack Query with a client in src/data/api/. See AGENTS.md #7.',
        },
      ],
    },
  },
  {
    // Stories need the PatternFly restrictions too — flat config replaces
    // `no-restricted-imports` wholesale rather than merging, so both sets
    // have to be spread here.
    files: ['src/**/*.stories.{js,jsx,ts,tsx}'],
    plugins: { 'experience-ui': experienceUi },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            ...patternflyImportPaths,
            ...localImportPaths,
            ...storyImportPaths,
          ],
        },
      ],
      'experience-ui/enforce-story-patterns': 'error',
    },
  },
  {
    // Playwright specs were previously unlinted entirely. Waits use the named
    // constants in playwright/constants.ts so timeout tuning happens in one
    // place rather than drifting across specs. See AGENTS.md #12.
    files: ['playwright/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "Property[key.name='timeout'] > Literal[value>0]",
          message:
            'Use a named constant from playwright/constants.ts instead of a raw millisecond value. See AGENTS.md #12.',
        },
      ],
    },
  },
  {
    files: ['src/**/*.test.{js,jsx,ts,tsx}', 'src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
    plugins: { 'experience-ui': experienceUi },
    rules: {
      'experience-ui/no-jest-snapshot': 'error',
    },
  },
);
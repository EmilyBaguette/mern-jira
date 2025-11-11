import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.es2023 },
    },
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'warn',
        { paths: [{ name: 'lodash', message: 'Import specific functions' }] },
      ],

      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
            '**/*.stories.{ts,tsx}',
            '**/vitest.config.*',
            '**/playwright.config.*',
            '**/eslint.config.*',
            'apps/client/vite.config.ts',
          ],
        },
      ],

      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-ts-expect-error': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        { ignoreConditionalTests: false, ignoreMixedLogicalExpressions: false },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: false },
        },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'variable', modifiers: ['const'], format: ['camelCase', 'UPPER_CASE'] },
      ],

      'prettier/prettier': 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve('./tsconfig.base.json'),
        },
      },
    },
  },

  {
    files: ['apps/client/**/*.{ts,tsx}'],
    extends: [
      react.configs.recommended,
      jsxA11y.configs.recommended,
      reactHooks.configs.recommended,
    ],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      globals: { ...globals.browser },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-no-leaked-render': ['warn', { validStrategies: ['ternary'] }],
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/self-closing-comp': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    files: ['apps/server/**/*.{ts,tsx}'],
    extends: [n.configs['flat/recommended']],
    plugins: { n },
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'n/no-missing-import': 'off',
    },
  },

  eslintConfigPrettier,
]);

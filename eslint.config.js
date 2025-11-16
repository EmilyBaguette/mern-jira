import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.vite/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    rules: {
      'no-console': 'off',
      'no-debugger': 'warn',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      'import/no-unresolved': 'off',
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
    },
  },

  {
    files: ['apps/client/**/*.{ts,tsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // ...reactPlugin.configs.recommended.rules,
      // ...reactPlugin.configs.jsxRuntime.rules,
      // ...jsxA11y.configs.recommended.rules,

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off', // for new JSX transform / Vite
      'react/jsx-props-no-spreading': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  {
    files: ['apps/server/**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      n: nodePlugin,
    },

    rules: {
      ...nodePlugin.configs['recommended-module'].rules,

      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-process-env': 'off',
    },
  },
]);

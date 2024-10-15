// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jest from 'eslint-plugin-jest';
import jestExtended from 'eslint-plugin-jest-extended';
import eslintPluginPrettierRecommened from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  {
    name: '@app/typescript-eslint',
    files: ['**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
          defaultProject: 'tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    name: '@app/typescript-eslint/type-check',
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts'],
    extends: [...tseslint.configs.strictTypeChecked],
    rules: {
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['signature', 'field', 'constructor', 'method'] },
      ],
    },
  },
  {
    name: '@app/sonarjs',
    files: ['**/*.ts'],
    extends: [sonarjs.configs.recommended],
    rules: {
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/argument-type': 'off',
      'sonarjs/todo-tag': 'warn',
    },
  },
  {
    name: '@app/sonarjs/test',
    files: ['**/*.spec.ts'],
    extends: [sonarjs.configs.recommended],
    rules: {
      'sonarjs/no-identical-functions': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/no-base-to-string': 'off',
      'sonarjs/no-clear-text-protocols': 'off',
    },
  },
  {
    name: '@app/jest',
    files: ['**/*.spec.ts'],
    extends: [
      jest.configs['flat/recommended'],
      jest.configs['flat/style'],
      jestExtended.configs['flat/all'],
    ],
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    name: '@app/stylistic',
    extends: [
      stylistic.configs.customize({
        semi: true,
        quotes: 'single',
        quoteProps: 'as-needed',
        indent: 2,
        flat: true,
        arrowParens: true,
        braceStyle: '1tbs',
      }),
    ],
    rules: {
      '@stylistic/lines-between-class-members': [
        'error',
        { enforce: [{ blankLine: 'always', prev: '*', next: 'method' }] },
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        { overrides: { '?': 'before', ':': 'before' } },
      ],
    },
  },
  {
    name: '@app/disable-type-check',
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    name: '@app/files/module',
    files: ['**/*.module.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  eslintPluginPrettierRecommened,
);

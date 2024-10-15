/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { project: true },
  plugins: ['@typescript-eslint/eslint-plugin', 'functional'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: { node: true, jest: true },
  ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'no-console': 'error',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    'functional/readonly-type': 'error',
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-extended/all',
        'plugin:jest-formatting/strict',
      ],
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        'sonarjs/no-identical-functions': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['*.ts'],
      excludedFiles: ['*.spec.ts'],
      extends: ['plugin:@typescript-eslint/strict-type-checked'],
      rules: {
        '@typescript-eslint/member-ordering': [
          'error',
          { default: ['signature', 'field', 'constructor', 'method'] },
        ],
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': [
          'error',
          { enforce: [{ blankLine: 'always', prev: '*', next: 'method' }] },
        ],
        'functional/prefer-immutable-types': [
          'error',
          {
            enforcement: 'ReadonlyShallow',
            ignoreClasses: true,
            ignoreInferredTypes: true,
          },
        ],
      },
    },
    {
      files: ['*.module.ts'],
      rules: { '@typescript-eslint/no-extraneous-class': 'off' },
    },
  ],
};

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  rootDir: '.',
  prettierPath: null, // HACK: Prettier v3 is incompatible with Jest's inline snapshots
  moduleFileExtensions: ['js', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  collectCoverageFrom: ['src/**/*.(use-case|adapter|service).ts'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['jest-extended/all'],
  // Helps to use aliases in tsconfig (@module/*)
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
    prefix: '<rootDir>',
  }),
};

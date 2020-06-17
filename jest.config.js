/* eslint-disable no-undef */
module.exports = {
    verbose: true,
    testEnvironment: 'node',
    rootDir: '.',
    testMatch: ['<rootDir>/**/?(*.)+(spec|test).ts'],
    transformIgnorePatterns: ['node_modules/(?!(publication-types))', 'dist/'],
    modulePathIgnorePatterns: ['<rootDir>/src/.*.js'],
    transform: {
        '^.+\\.tsx?': 'ts-jest',
    },
    moduleNameMapper: {},
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    coverageReporters: ['json', 'lcov', 'text', 'teamcity'],
}
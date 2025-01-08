////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  verbose: true,
  testMatch: ['**/test/**/*.test.js'],
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '\\.js$': 'babel-jest',
    '\\.vue$': '@vue/vue3-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@qubit-ltd|lodash-es)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 配置路径别名映射
    '^quasar/icon-set/(.*)$': '<rootDir>/node_modules/quasar/icon-set/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'], // 序列化 Vue 快照
  setupFilesAfterEnv: [
    'jest-extended/all',
  ],
  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: ['**/src/**/*.js'],
  testEnvironment: 'jsdom', // 使用 jsdom 作为测试环境
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};

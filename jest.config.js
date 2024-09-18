module.exports = {
  testEnvironment: 'jsdom', // jsdomを使用してブラウザのような環境をシミュレート
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // setupファイルを指定
  moduleFileExtensions: ['js', 'jsx'], // テスト対象の拡張子
  transform: {
    '^.+\\.jsx?$': 'babel-jest' // JSXをbabelでトランスパイル
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // テストファイルのパターン
};

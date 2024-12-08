module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\./.*)\\.js$": "$1",
  },
};
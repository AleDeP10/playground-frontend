export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    resources: "usable",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(cross-fetch)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
};

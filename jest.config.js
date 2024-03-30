/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  clearMocks: true,
};

process.env = Object.assign(process.env, {
  AWS_XRAY_CONTEXT_MISSING: "IGNORE_ERROR",
});

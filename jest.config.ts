// jest.config.ts
import { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Using ts-jest preset for TypeScript
  testEnvironment: "jest-environment-jsdom", // Using jsdom for React testing
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // To import jest-dom matchers
  moduleNameMapper: {
    // This is important for handling assets and imports like CSS or images
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1", // Handle module aliases, if used in your project
    "^@utils/(.*)$": "<rootDir>/src/utils/$1", // Map @utils to src/utils
  },
  testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"], // Locate test files in the src folder
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.app.json",
    },
  },
};

export default config;

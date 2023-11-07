import type { Config } from "jest";

const config : Config= {
    clearMocks: true,
    coverageProvider: "v8",
    testEnvironment: "node",
    preset: "ts-jest",
    setupFiles: ["dotenv/config"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        // process `*.tsx` files with `ts-jest`
      },
    testMatch: ["**/__test__/**/*.test.ts"],
};

export default config;
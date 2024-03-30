import type { AWS } from "@serverless/typescript";

// eslint-disable-next-line no-restricted-imports
import infrastructure from "./src/infrastructure/serverless";

const serverlessConfiguration: AWS = {
  service: "lol-tracker",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-iam-roles-per-function",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    stage: "dev",
    region: "us-east-1",
    memorySize: 128,
    architecture: "arm64",
    versionFunctions: false,
    logRetentionInDays: 7,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      AWS_XRAY_CONTEXT_MISSING: "IGNORE_ERROR",
    },
  },
  functions: infrastructure.functions,
  resources: infrastructure.resources,
  custom: {
    esbuild: {
      sourcemap: true,
    },
  },
};

module.exports = serverlessConfiguration;

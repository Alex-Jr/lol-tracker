/* eslint-disable @typescript-eslint/no-var-requires */
// export all functions and resources

import { type AWS } from "@serverless/typescript";
import { readdirSync } from "fs";
import { join } from "path";

const output: {
  functions: Record<string, NonNullable<AWS["functions"]>[string]>,
  resources: Record<string, NonNullable<AWS["resources"]>>,
} = {
  functions: {},
  resources: {},
}


// read functions folder and add each function to the output
const functionsDir = readdirSync(join(__dirname, "functions"));

functionsDir.forEach((file) => {
  const functionName = file.split(".")[0]

  output.functions[functionName] = require(join(__dirname, "functions", file)).default
})

// read resources folder and add each resource to the output
const resourcesDir = readdirSync(join(__dirname, "resources"));

resourcesDir.forEach((file) => {
  const resourceName = file.split(".")[0]

  output.resources[resourceName] = require(join(__dirname, "resources", file)).default
})

export default output;
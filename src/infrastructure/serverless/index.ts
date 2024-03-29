/* eslint-disable @typescript-eslint/no-var-requires */
// export all functions and resources

import { type AWS } from '@serverless/typescript'
import { readdirSync } from 'fs'
import { join } from 'path'

const output: {
  functions: Record<string, NonNullable<AWS['functions']>[string]>
  resources: Record<string, NonNullable<AWS['resources']>>
} = {
  functions: {},
  resources: {}
}

// read functions folder and add each function to the output
const functionsDir = readdirSync(join(__dirname, 'functions'))

functionsDir.forEach((file) => {
  const functionName = file.split('.')[0]

  output.functions[functionName] = require(join(__dirname, 'functions', file)).default
})

// read resources folder and add each resource to the output
const resourcesDir = readdirSync(join(__dirname, 'resources'))

resourcesDir.forEach((file) => {
  // read each dir inside
  const innerDir = readdirSync(join(__dirname, 'resources', file))
  innerDir.forEach((innerFile) => {
    // const resourceName = innerFile.split(".")[0]

    const resource = require(join(__dirname, 'resources', file, innerFile)).default

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(resource).forEach((key) => {
      output.resources[key] = {
        ...output.resources[key],
        ...resource[key]
      }
    })
  })
})

// console.log(output)

export default output

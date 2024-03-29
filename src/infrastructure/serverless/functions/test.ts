import { type AWS } from "@serverless/typescript";

const lambda: NonNullable<AWS['functions']>[string] = {
  handler: 'src/app/handlers/test.default',
  events: [
    {
      http: {
        method: 'get',
        path: 'test',
      }
    }
  ]  
}

export default lambda;
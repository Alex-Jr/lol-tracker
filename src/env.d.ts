declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      DYNAMODB_TABLE_NAME: string
      RIOT_API_KEY: string
    }
  }
}

export {}

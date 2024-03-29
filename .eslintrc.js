module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard-with-typescript'],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['./src/infrastructure/serverless/**'],
      rules: {
        'no-template-curly-in-string': 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}

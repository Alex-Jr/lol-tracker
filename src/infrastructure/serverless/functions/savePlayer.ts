import { type AWS } from '@serverless/typescript'

const lambda: NonNullable<AWS['functions']>[string] = {
  handler: 'src/app/handlers/savePlayer.default',
  reservedConcurrency: 1,
  timeout: 10,
  environment: {
    PLAYER_TABLE_NAME: {
      Ref: 'PlayerTable'
    },
    RIOT_API_KEY: 'RGAPI-d9b42c50-5d30-4609-a1ef-ef2e18bc4d47'
  },
  // @ts-expect-error using plugin serverless-iam-roles-per-function
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:Query',
        'dynamodb:PutItem',
        'dynamodb:GetItem'
      ],
      Resource: [
        {
          'Fn::GetAtt': [
            'PlayerTable',
            'Arn'
          ]
        },
        {
          'Fn::Join': [
            '',
            [
              {
                'Fn::GetAtt': [
                  'PlayerTable',
                  'Arn'
                ]
              },
              '/*'
            ]
          ]
        }
      ]
    }
  ]
}

export default lambda
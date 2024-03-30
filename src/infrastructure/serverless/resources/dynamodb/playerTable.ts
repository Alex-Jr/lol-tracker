import { type AWS } from "@serverless/typescript";

const resource: NonNullable<AWS["resources"]> = {
  Resources: {
    PlayerTable: {
      Type: "AWS::DynamoDB::Table",
      Properties: {
        TableName: "${self:service}-player-${self:provider.stage}",
        AttributeDefinitions: [
          {
            AttributeName: "PUUID",
            AttributeType: "S",
          },
          {
            AttributeName: "riotID",
            AttributeType: "S",
          },
        ],
        KeySchema: [
          {
            AttributeName: "PUUID",
            KeyType: "HASH",
          },
        ],
        GlobalSecondaryIndexes: [
          {
            IndexName: "riotIDIndex",
            KeySchema: [
              {
                AttributeName: "riotID",
                KeyType: "HASH",
              },
            ],
            Projection: {
              ProjectionType: "KEYS_ONLY",
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1,
            },
          },
        ],
        BillingMode: "PROVISIONED",
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    },
  },
};

export default resource;

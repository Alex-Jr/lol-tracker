import { type AWS } from "@serverless/typescript";

const resource: NonNullable<AWS["resources"]> = {
  Resources: {
    ProcessQueueDead: {
      Type: "AWS::SQS::Queue",
      Properties: {
        QueueName: "${self:service}-process-dead-${self:provider.stage}",
      },
    },
    ProcessQueue: {
      Type: "AWS::SQS::Queue",
      Properties: {
        QueueName: "${self:service}-process-${self:provider.stage}",
        RedrivePolicy: {
          deadLetterTargetArn: {
            "Fn::GetAtt": ["ProcessQueueDead", "Arn"],
          },
          maxReceiveCount: 3,
        },
      },
    },
  },
};

export default resource;

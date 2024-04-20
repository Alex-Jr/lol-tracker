import { SQSClient } from "@aws-sdk/client-sqs";
import { captureAWSv3Client } from "aws-xray-sdk";
import { z } from "zod";

import { LOLFakeAPIGateway } from "@/app/gateways/lol-fake.api.gateway";
import { ProcessQueueGateway } from "@/app/gateways/process.queue.gateway";
import { DynamoDBPlayerRepository } from "@/app/repository/player.repository";
import { SavePlayerUseCase } from "@/app/useCases/savePlayer.useCase";

const playerRepository = new DynamoDBPlayerRepository();
const lolGateway = new LOLFakeAPIGateway();
const processQueueGateway = new ProcessQueueGateway(
  captureAWSv3Client(new SQSClient({})),
);
const savePlayerUseCase = new SavePlayerUseCase(
  lolGateway,
  playerRepository,
  processQueueGateway,
);

const inputSchema = z.object({
  gameName: z.string(),
  tagLine: z.string(),
});

/**
 * @command sls invoke local -f test
 */
export default async function (
  event: z.infer<typeof inputSchema>,
): Promise<void> {
  const { gameName, tagLine } = inputSchema.parse(event);

  await savePlayerUseCase.execute({
    gameName,
    tagLine,
  });
}

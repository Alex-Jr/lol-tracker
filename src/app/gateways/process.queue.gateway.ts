import {
  SendMessageBatchCommand,
  SendMessageCommand,
  type SQSClient,
} from "@aws-sdk/client-sqs";

import { xray } from "@/app/decorators/xray.decorator";
import { type Player } from "@/app/entities/player.entity";
import { type IProcessQueueGateway } from "@/interfaces/gateways/process.queue.gateway";

export class ProcessQueueGateway implements IProcessQueueGateway {
  constructor(private readonly sqs: SQSClient) {}

  @xray
  async send(data: { player: Player; date: Date }): Promise<void> {
    await this.sqs.send(
      new SendMessageCommand({
        MessageBody: JSON.stringify(data),
        QueueUrl: process.env.PROCESS_QUEUE_URL,
      }),
    );
  }

  @xray
  async sendBatch(data: Array<{ player: Player; date: Date }>): Promise<void> {
    const batches = data.reduce<
      Array<
        Array<{
          player: Player;
          date: Date;
        }>
      >
    >((acc, item, i) => {
      if (i % 10 === 0) {
        acc.push([]);
      }

      acc[acc.length - 1].push(item);

      return acc;
    }, []);

    for (const batch of batches) {
      const response = await this.sqs.send(
        new SendMessageBatchCommand({
          Entries: batch.map((item, i) => ({
            Id: `${i}-${item.date.valueOf()}`,
            MessageBody: JSON.stringify(item),
          })),
          QueueUrl: process.env.PROCESS_QUEUE_URL,
        }),
      );

      console.log("Batch sent: ", {
        successful: response.Successful?.length ?? 0,
        failed: response.Failed?.length ?? 0,
      });
    }
  }
}

import { z } from "zod";

import { LOL } from "@/app/gateways/lol.gateway";
import { DynamoDBPlayerRepository } from "@/app/repository/player.repository";
import { SavePlayerUseCase } from "@/app/useCases/savePlayer.useCase";

const playerRepository = new DynamoDBPlayerRepository();
const lolGateway = new LOL();
const savePlayerUseCase = new SavePlayerUseCase(lolGateway, playerRepository);

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

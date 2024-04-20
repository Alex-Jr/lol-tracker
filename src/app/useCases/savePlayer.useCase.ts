import { xray } from "@/app/decorators/xray.decorator";
import { Player } from "@/app/entities/player.entity";
import { RiotID } from "@/app/valueObjects/riotID";
import { type ILOLAPIGateway } from "@/interfaces/gateways/lol.api.gateway";
import { type IProcessQueueGateway } from "@/interfaces/gateways/process.queue.gateway";
import { type IPlayerRepository } from "@/interfaces/repositories/player.repository";

export class SavePlayerUseCase {
  constructor(
    private readonly gateway: ILOLAPIGateway,
    private readonly playerRepository: IPlayerRepository,
    private readonly processQueueGateway: IProcessQueueGateway,
  ) {}

  @xray
  async execute({
    gameName,
    tagLine,
  }: {
    gameName: string;
    tagLine: string;
  }): Promise<void> {
    const riotID = new RiotID(gameName, tagLine);

    let player = await this.playerRepository.findByRiotID(riotID);

    if (player !== undefined) {
      throw new Error("Player already exists");
    }

    const PUUID = await this.gateway.getPUUIDbyRiotID(riotID);

    if (PUUID === undefined) {
      throw new Error("Player not found");
    }

    player = new Player({
      PUUID,
      riotID,
    });

    await this.playerRepository.save(player);

    await this.processQueueGateway.sendBatch(
      // get how many days have passed since 2021-06-16
      Array.from({
        length: Math.floor((Date.now() - 1623812400000) / 86400000),
      }).map((_, i) => ({
        date: new Date(1623812400000 + i * 86400000),
        player,
      })),
    );
  }
}

import { type Player } from "../../app/entities/player.entity";

export interface PlayerRepository {
  findByPUUID: (PUUID: string) => Promise<Player | undefined>;
  findByRiotID: (riotID: string) => Promise<Player | undefined>;
  save: (player: Player) => Promise<void>;
}

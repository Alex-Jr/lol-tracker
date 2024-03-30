import { type Player } from "@/app/entities/player.entity";
import { type RiotID } from "@/app/valueObjects/riotID";

export interface PlayerRepository {
  findByPUUID: (PUUID: string) => Promise<Player | undefined>;
  findByRiotID: (riotID: RiotID) => Promise<Player | undefined>;
  save: (player: Player) => Promise<void>;
}

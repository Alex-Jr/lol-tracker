import { type Player } from "@/app/entities/player.entity";

export interface IProcessQueueGateway {
  send: (data: { player: Player; date: Date }) => Promise<void>;
  sendBatch: (data: Array<{ player: Player; date: Date }>) => Promise<void>;
}

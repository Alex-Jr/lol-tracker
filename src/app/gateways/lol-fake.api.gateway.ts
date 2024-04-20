import { type RiotID } from "@/app/valueObjects/riotID";
import { type ILOLAPIGateway } from "@/interfaces/gateways/lol.api.gateway";

export class LOLFakeAPIGateway implements ILOLAPIGateway {
  async getPUUIDbyRiotID(riotID: RiotID): Promise<string> {
    return "PUUID";
  }
}

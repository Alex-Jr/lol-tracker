import axios from "axios";

import { xray } from "@/app/decorators/xray.decorator";
import { RiotID } from "@/app/valueObjects/riotID";
import { type ILOLAPIGateway } from "@/interfaces/gateways/lol.api.gateway";

export class LOLAPIGateway implements ILOLAPIGateway {
  @xray
  async getPUUIDbyRiotID(riotID: RiotID): Promise<string | undefined> {
    try {
      const {
        data: { puuid },
      } = await axios.get<{
        puuid: string;
      }>(
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotID.gameName}/${riotID.tagLine}`,
        {
          headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY,
          },
        },
      );

      return puuid;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return undefined;
      }

      if ("toJSON" in error) {
        console.error(error.toJSON());
      }

      throw error;
    }
  }
}

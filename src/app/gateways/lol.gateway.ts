import axios from "axios";

import { type LOLGateway } from "../../interfaces/gateways/lol.gateway";
import { xray } from "../decorators/xray.decorator";
import { type RiotID } from "../valueObjects/riotID";

export class LOL implements LOLGateway {
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
      if ("toJSON" in error) {
        console.error(error.toJSON());

        return undefined;
      }

      throw error;
    }
  }
}

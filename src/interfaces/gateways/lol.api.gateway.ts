import { type RiotID } from "@/app/valueObjects/riotID";

export interface ILOLAPIGateway {
  getPUUIDbyRiotID: (riotID: RiotID) => Promise<string | undefined>;
}

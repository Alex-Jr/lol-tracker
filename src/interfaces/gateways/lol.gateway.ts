import { type RiotID } from '../../app/valueObjects/riotID'

export interface LOLGateway {
  getPUUIDbyRiotID: (riotID: RiotID) => Promise<string | undefined>
}

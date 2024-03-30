import { type LOLGateway } from '../../interfaces/gateways/lol.gateway'
import { type PlayerRepository } from '../../interfaces/repositories/player.repository'
import { xray } from '../decorators/xray.decorator'
import { Player } from '../entities/player.entity'
import { RiotID } from '../valueObjects/riotID'

export class SavePlayerUseCase {
  constructor (
    private readonly gateway: LOLGateway,
    private readonly playerRepository: PlayerRepository
  ) {
  }

  @xray
  async execute ({
    gameName,
    tagLine
  }: {
    gameName: string
    tagLine: string
  }): Promise<void> {
    const riotID = new RiotID(
      gameName,
      tagLine
    )

    const player = await this.playerRepository.findByRiotID(riotID.toString())

    if (player !== undefined) {
      throw new Error('Player already exists')
    }

    const PUUID = await this.gateway.getPUUIDbyRiotID(riotID)

    if (PUUID === undefined) {
      throw new Error('Player not found')
    }

    await this.playerRepository.save(new Player({
      PUUID,
      riotID
    }))
  }
}

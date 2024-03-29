const regionMap = {
  BR: 'AMERICAS',
  NA: 'AMERICAS',
  LAN: 'AMERICAS',
  LAS: 'AMERICAS',
  KR: 'ASIA',
  JP: 'ASIA',
  EUNE: 'EUROPE',
  EUW: 'EUROPE',
  TR: 'EUROPE',
  RU: 'EUROPE',
  OCE: 'SEA',
  PH2: 'SEA',
  SG2: 'SEA',
  TH2: 'SEA',
  TW2: 'SEA',
  VN2: 'SEA'
} as const

export class Region {
  public region: string
  public regionGroup: string

  constructor (
    region: string
  ) {
    // @ts-expect-error we will validate the region
    const regionGroup = regionMap[region]

    if (regionGroup === undefined) {
      throw new Error('Invalid region')
    }

    this.region = region
    this.regionGroup = regionGroup
  }
}

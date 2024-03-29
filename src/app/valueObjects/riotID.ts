export class RiotID {
  constructor (
    public gameName: string,
    public tagLine: string
  ) { }

  toString (): string {
    return `${this.gameName}#${this.tagLine}`
  }
}

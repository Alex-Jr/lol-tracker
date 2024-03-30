import { type RiotID } from "@/app/valueObjects/riotID";

interface IPlayer {
  PUUID: string;
  lastFetchedDate: Date;
  riotID: RiotID;
}

export class Player {
  readonly #props: IPlayer;

  constructor(props: {
    PUUID: string;
    lastFetchedDate?: Date;
    riotID: RiotID;
  }) {
    this.#props = {
      PUUID: props.PUUID,
      lastFetchedDate: props.lastFetchedDate ?? new Date("2021-06-16"),
      riotID: props.riotID,
    };
  }

  get PUUID(): string {
    return this.#props.PUUID;
  }

  get lastFetchedDate(): Date {
    return this.#props.lastFetchedDate;
  }

  get riotID(): RiotID {
    return this.#props.riotID;
  }

  incrementLastFetchedDate(): void {
    this.#props.lastFetchedDate.setDate(
      this.#props.lastFetchedDate.getDate() + 1,
    );
  }

  toJSON(): IPlayer {
    return this.#props;
  }
}

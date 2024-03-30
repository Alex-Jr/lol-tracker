import { Player } from "@/app/entities/player.entity";
import { RiotID } from "@/app/valueObjects/riotID";

describe("PlayerEntity", () => {
  it.each<{
    name: string;
    input: {
      player: ConstructorParameters<typeof Player>[0];
    };
    expected: {
      player: ReturnType<Player["toJSON"]>;
    };
  }>([
    {
      name: "should return the player object when all properties are set",
      input: {
        player: {
          PUUID: "abc",
          riotID: new RiotID("name", "tag"),
          lastFetchedDate: new Date("2023-01-01T00:00:00Z"),
        },
      },
      expected: {
        player: {
          PUUID: "abc",
          riotID: "name#tag",
          lastFetchedDate: "2023-01-01T00:00:00.000Z",
        },
      },
    },
    {
      name: "should return lastFetchedDate as default when not set",
      input: {
        player: {
          PUUID: "abc",
          riotID: new RiotID("name", "tag"),
        },
      },
      expected: {
        player: {
          PUUID: "abc",
          riotID: "name#tag",
          lastFetchedDate: "2021-06-16T00:00:00.000Z",
        },
      },
    },
  ])("$name", ({ input, expected }) => {
    const player = new Player(input.player);

    expect(player.toJSON()).toEqual(expected.player);
  });
});

import { RiotID } from "@/app/valueObjects/riotID";

describe("RiotIDValueObject", () => {
  it.each<{
    name: string;
    input: {
      gameName: string;
      tagLine: string;
    };
    expected: string;
  }>([
    {
      name: "should return the correct value 1",
      input: {
        gameName: "gameName",
        tagLine: "tagLine",
      },
      expected: "gameName#tagLine",
    },
    {
      name: "should return the correct value 2",
      input: {
        gameName: "gameName",
        tagLine: "tagLine#1234",
      },
      expected: "gameName#tagLine#1234",
    },
  ])("$name", ({ input, expected }) => {
    const riotID = new RiotID(input.gameName, input.tagLine);

    expect(riotID.toString()).toBe(expected);
  });
});

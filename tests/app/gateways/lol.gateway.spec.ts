import axios from "axios";

jest.mock("axios");

const MockedAxios = axios as jest.Mocked<typeof axios>;

describe("LolGateway", () => {
  it("should return the puuid when the request is successful", async () => {
    const { LOL } = await import("@/app/gateways/lol.gateway");
    const { RiotID } = await import("@/app/valueObjects/riotID");

    const lol = new LOL();

    MockedAxios.get.mockResolvedValueOnce({
      data: {
        puuid: "abc",
      },
    });

    const puuid = await lol.getPUUIDbyRiotID(new RiotID("name", "tag"));

    expect(puuid).toBe("abc");
  });

  it("should return undefined when the request fails with status 404", async () => {
    const { LOL } = await import("@/app/gateways/lol.gateway");
    const { RiotID } = await import("@/app/valueObjects/riotID");

    const lol = new LOL();

    MockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });

    const puuid = await lol.getPUUIDbyRiotID(new RiotID("name", "tag"));

    expect(puuid).toBeUndefined();
  });

  it("should throw an error when the request fails with an unknown error", async () => {
    const { LOL } = await import("@/app/gateways/lol.gateway");
    const { RiotID } = await import("@/app/valueObjects/riotID");

    const lol = new LOL();

    MockedAxios.get.mockRejectedValueOnce(new Error("Unknown error"));

    await expect(
      lol.getPUUIDbyRiotID(new RiotID("name", "tag")),
    ).rejects.toThrow("Unknown error");
  });

  it("should log the error when the error has a toJSON method", async () => {
    const { LOL } = await import("@/app/gateways/lol.gateway");
    const { RiotID } = await import("@/app/valueObjects/riotID");

    const lol = new LOL();

    class ErrorWithToJSON extends Error {
      toJSON(): string {
        return "Error from toJSON";
      }
    }

    MockedAxios.get.mockRejectedValueOnce(
      new ErrorWithToJSON("Unknown error with toJSON"),
    );

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    await expect(
      lol.getPUUIDbyRiotID(new RiotID("name", "tag")),
    ).rejects.toThrow("Unknown error with toJSON");

    expect(consoleSpy).toHaveBeenCalledWith("Error from toJSON");

    consoleSpy.mockRestore();
  });
});

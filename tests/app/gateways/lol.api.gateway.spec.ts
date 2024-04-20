import axios from "axios";

import { LOLAPIGateway } from "@/app/gateways/lol.api.gateway";
import { RiotID } from "@/app/valueObjects/riotID";

jest.mock("axios");

const MockedAxios = axios as jest.Mocked<typeof axios>;

describe("LolGateway", () => {
  it("should return the puuid when the request is successful", async () => {
    const lol = new LOLAPIGateway();

    MockedAxios.get.mockResolvedValueOnce({
      data: {
        puuid: "abc",
      },
    });

    const puuid = await lol.getPUUIDbyRiotID(new RiotID("name", "tag"));

    expect(puuid).toBe("abc");
  });

  it("should return undefined when the request fails with status 404", async () => {
    const lol = new LOLAPIGateway();

    MockedAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });

    const puuid = await lol.getPUUIDbyRiotID(new RiotID("name", "tag"));

    expect(puuid).toBeUndefined();
  });

  it("should throw an error when the request fails with an unknown error", async () => {
    const lol = new LOLAPIGateway();

    MockedAxios.get.mockRejectedValueOnce(new Error("Unknown error"));

    await expect(
      lol.getPUUIDbyRiotID(new RiotID("name", "tag")),
    ).rejects.toThrow("Unknown error");
  });

  it("should log the error when the error has a toJSON method", async () => {
    const lol = new LOLAPIGateway();

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

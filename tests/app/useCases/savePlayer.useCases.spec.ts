import { Player } from "@/app/entities/player.entity";
import { LOL } from "@/app/gateways/lol.gateway";
import { DynamoDBPlayerRepository } from "@/app/repository/player.repository";
import { SavePlayerUseCase } from "@/app/useCases/savePlayer.useCase";
import { RiotID } from "@/app/valueObjects/riotID";

jest.mock("@/app/gateways/lol.gateway");
jest.mock("@/app/repository/player.repository");

const MockedLOL = LOL as jest.MockedClass<typeof LOL>;
const MockedDynamoDBPlayerRepository =
  DynamoDBPlayerRepository as jest.MockedClass<typeof DynamoDBPlayerRepository>;

describe("SavePlayerUseCase", () => {
  it("should save the player when the request is successful", async () => {
    MockedDynamoDBPlayerRepository.prototype.findByRiotID.mockResolvedValueOnce(
      undefined,
    );
    MockedLOL.prototype.getPUUIDbyRiotID.mockResolvedValueOnce("abc");

    MockedDynamoDBPlayerRepository.prototype.save.mockResolvedValueOnce();

    const savePlayerUseCase = new SavePlayerUseCase(
      new LOL(),
      new DynamoDBPlayerRepository(),
    );

    await savePlayerUseCase.execute({
      gameName: "name",
      tagLine: "tag",
    });

    expect(
      MockedDynamoDBPlayerRepository.prototype.findByRiotID,
    ).toHaveBeenCalledWith({
      gameName: "name",
      tagLine: "tag",
    });

    expect(MockedLOL.prototype.getPUUIDbyRiotID).toHaveBeenCalledWith({
      gameName: "name",
      tagLine: "tag",
    });

    expect(MockedDynamoDBPlayerRepository.prototype.save).toHaveBeenCalledWith(
      new Player({
        PUUID: "abc",
        lastFetchedDate: new Date("2021-06-16T00:00:00.000Z"),
        riotID: new RiotID("name", "tag"),
      }),
    );
  });
});

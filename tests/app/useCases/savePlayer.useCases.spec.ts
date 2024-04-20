import { Player } from "@/app/entities/player.entity";
import { SavePlayerUseCase } from "@/app/useCases/savePlayer.useCase";
import { RiotID } from "@/app/valueObjects/riotID";
import { type ILOLAPIGateway } from "@/interfaces/gateways/lol.api.gateway";
import { type IProcessQueueGateway } from "@/interfaces/gateways/process.queue.gateway";
import { type IPlayerRepository } from "@/interfaces/repositories/player.repository";

const MockedLOL: jest.Mocked<ILOLAPIGateway> = {
  getPUUIDbyRiotID: jest.fn(),
};

const MockedDynamoDBPlayerRepository: jest.Mocked<IPlayerRepository> = {
  findByRiotID: jest.fn(),
  findByPUUID: jest.fn(),
  save: jest.fn(),
};

const MockedProcessQueue: jest.Mocked<IProcessQueueGateway> = {
  send: jest.fn(),
  sendBatch: jest.fn(),
};

describe("SavePlayerUseCase", () => {
  it("should save the player when the request is successful", async () => {
    MockedDynamoDBPlayerRepository.findByRiotID.mockResolvedValueOnce(
      undefined,
    );
    MockedLOL.getPUUIDbyRiotID.mockResolvedValueOnce("abc");

    MockedDynamoDBPlayerRepository.save.mockResolvedValueOnce();

    MockedProcessQueue.send.mockResolvedValueOnce();

    const savePlayerUseCase = new SavePlayerUseCase(
      MockedLOL,
      MockedDynamoDBPlayerRepository,
      MockedProcessQueue,
    );

    await savePlayerUseCase.execute({
      gameName: "name",
      tagLine: "tag",
    });

    expect(MockedDynamoDBPlayerRepository.findByRiotID).toHaveBeenCalledWith({
      gameName: "name",
      tagLine: "tag",
    });

    expect(MockedLOL.getPUUIDbyRiotID).toHaveBeenCalledWith({
      gameName: "name",
      tagLine: "tag",
    });

    expect(MockedDynamoDBPlayerRepository.save).toHaveBeenCalledWith(
      new Player({
        PUUID: "abc",
        lastFetchedDate: new Date("2021-06-16T00:00:00.000Z"),
        riotID: new RiotID("name", "tag"),
      }),
    );
  });
});

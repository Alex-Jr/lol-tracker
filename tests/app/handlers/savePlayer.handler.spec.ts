import savePlayer from "@/app/handlers/savePlayer";
import { SavePlayerUseCase } from "@/app/useCases/savePlayer.useCase";

jest.mock("@/app/useCases/savePlayer.useCase");
const MockedSavePlayerUseCase = SavePlayerUseCase as jest.MockedClass<
  typeof SavePlayerUseCase
>;
describe("SavePlayerHandler", () => {
  it("should not throw on valid input", async () => {
    MockedSavePlayerUseCase.prototype.execute.mockResolvedValueOnce();

    expect(async () => {
      await savePlayer({ gameName: "gameName", tagLine: "tagLine" });
    }).not.toThrow();

    expect(MockedSavePlayerUseCase.prototype.execute).toHaveBeenCalledWith({
      gameName: "gameName",
      tagLine: "tagLine",
    });
  });

  it("should throw on invalid input", async () => {
    MockedSavePlayerUseCase.prototype.execute.mockResolvedValueOnce();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await expect(savePlayer({} as any)).rejects.toThrow();

    expect(MockedSavePlayerUseCase.prototype.execute).not.toHaveBeenCalled();
  });
});

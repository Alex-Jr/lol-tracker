import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { captureAWSv3Client } from "aws-xray-sdk";
import dynamoose from "dynamoose";
import { type Item } from "dynamoose/dist/Item";

import { Player } from "@/app/entities/player.entity";
import { RiotID } from "@/app/valueObjects/riotID";
import { type PlayerRepository } from "@/interfaces/repositories/player.repository";

dynamoose.aws.ddb.set(captureAWSv3Client(new DynamoDB({})));

interface IPlayerModel extends Item {
  PUUID: string;
  lastFetchedDate: Date;
  riotID: string;
}

const PlayerModel = dynamoose.model<IPlayerModel>(
  "Player",
  {
    PUUID: {
      type: String,
      required: true,
    },
    lastFetchedDate: {
      type: Date,
      required: true,
    },
    riotID: {
      type: String,
      required: false,
      index: {
        type: "global",
        name: "riotIDIndex",
      },
    },
  },
  {
    tableName: process.env.PLAYER_TABLE_NAME,
    waitForActive: false,
    update: false,
    create: false,
  },
);

export class DynamoDBPlayerRepository implements PlayerRepository {
  async findByPUUID(ID: string): Promise<Player | undefined> {
    const player = await PlayerModel.get(ID);

    if (player === undefined) {
      return undefined;
    }

    const [gameName, tagLine] = player.riotID.split("#");

    return new Player({
      PUUID: player.PUUID,
      lastFetchedDate: player.lastFetchedDate,
      riotID: new RiotID(gameName, tagLine),
    });
  }

  async findByRiotID(riotID: string): Promise<Player | undefined> {
    const queryResult = await PlayerModel.query("riotID").eq(riotID).exec();

    if (queryResult.length === 0) {
      return undefined;
    }

    return await this.findByPUUID(queryResult[0].PUUID);
  }

  async save(player: Player): Promise<void> {
    console.log("Saving player", player.toJSON());
    await PlayerModel.create({
      PUUID: player.PUUID,
      lastFetchedDate: player.lastFetchedDate,
      riotID: player.riotID.toString(),
    });
  }
}

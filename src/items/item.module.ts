import { Module } from "@nestjs/common";
import { ItemResolver } from "./item.resolver";
import { ItemService } from "./item.service";
import { DynamoDBService } from "@dynamodb/dynamodb.service";

@Module({
  providers: [ItemResolver, ItemService, DynamoDBService]
})
export class ItemModule {}
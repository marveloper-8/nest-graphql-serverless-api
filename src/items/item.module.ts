import { Module } from "@nestjs/common";
import { ItemResolver } from "./item.resolver";
import { DynamoDBService } from "@dynamodb/dynamodb.service";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateItemHandler } from "./handlers/create-item.handler";
import { UpdateItemHandler } from "./handlers/update-item.handler";
import { DeleteItemHandler } from "./handlers/delete-item.handler";
import { EventBusService } from "@events/event-bus.service";
import { EventPublisherService } from "@events/event-publisher.service";

@Module({
  imports: [CqrsModule],
  providers: [
    ItemResolver,
    DynamoDBService,
    CreateItemHandler,
    UpdateItemHandler,
    DeleteItemHandler,
    EventBusService,
    EventPublisherService,
  ],
})
export class ItemModule {}
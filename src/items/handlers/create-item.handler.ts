import { DynamoDBService } from "@dynamodb/dynamodb.service";
import { CreateItemCommand } from "@items/commands/create-item.command";
import { v4 as uuidv4 } from 'uuid'
import { CommandHandler, EventPublisher, ICommandHandler, IEvent } from "@nestjs/cqrs";
import { ItemCreatedEvent } from "@items/events/item-created.event";
import { Item } from "@items/entities/item.entity";
import { AggregateRoot } from "@nestjs/cqrs";

// Create an ItemAggregate that extends AggregateRoot
class ItemAggregate extends AggregateRoot {
  constructor(private readonly item: Item) {
    super();
  }

  create() {
    this.apply(new ItemCreatedEvent(this.item));
  }
}

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(
    private dynamoDBService: DynamoDBService,
    private eventPublisher: EventPublisher,
  ) { }

  async execute(command: CreateItemCommand) {
    const { input } = command;
    const item: Item = {
      id: uuidv4(),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await this.dynamoDBService.create(item)

    // Create an ItemAggregate instance and publish the event
    const itemAggregate = this.eventPublisher.mergeObjectContext(
      new ItemAggregate(item)
    );
    itemAggregate.create();
    itemAggregate.commit();

    return item;
  }
}
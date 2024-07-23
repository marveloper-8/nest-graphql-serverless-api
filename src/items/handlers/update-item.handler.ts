import { DynamoDBService } from "@dynamodb/dynamodb.service";
import { UpdateItemCommand } from "@items/commands/update-item.command";
import { ItemUpdatedEvent } from "@items/events/item-updated.event";
import { AggregateRoot, CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

class ItemAggregate extends AggregateRoot {
  constructor(private readonly item: any) {
    super();
  }

  updateItem() {
    this.apply(new ItemUpdatedEvent(this.item));
  }
}

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
  constructor(
    private dynamoDBService: DynamoDBService,
    private eventPublisher: EventPublisher
  ) { }

  async execute(command: UpdateItemCommand) {
    const { input } = command;
    const updatedItem = await this.dynamoDBService.update(input.id, {
      ...input,
      updatedAt: new Date().toISOString()
    });

    const aggregate = new ItemAggregate(updatedItem);
    aggregate.updateItem();

    const aggregateWithContext = this.eventPublisher.mergeObjectContext(aggregate);
    aggregateWithContext.commit();

    return updatedItem;
  }
}
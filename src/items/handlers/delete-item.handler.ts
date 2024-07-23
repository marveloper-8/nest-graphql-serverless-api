import { DynamoDBService } from "@dynamodb/dynamodb.service";
import { DeleteItemCommand } from "@items/commands/delete-item.command";
import { ItemDeletedEvent } from "@items/events/item-deleted.event";
import { AggregateRoot, CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

class ItemAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  deleteItem() {
    this.apply(new ItemDeletedEvent(this.id));
  }
}

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
  constructor(
    private dynamoDBService: DynamoDBService,
    private eventPublisher: EventPublisher
  ) { }

  async execute(command: DeleteItemCommand) {
    const { id } = command;
    await this.dynamoDBService.remove(id);

    const aggregate = new ItemAggregate(id);
    aggregate.deleteItem();

    const aggregateWithContext = this.eventPublisher.mergeObjectContext(aggregate);
    aggregateWithContext.commit();

    return true;
  }
}
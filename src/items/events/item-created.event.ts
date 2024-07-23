import { Item } from "@items/entities/item.entity";
import { IEvent } from "@nestjs/cqrs";

export class ItemCreatedEvent implements IEvent {
  constructor(public readonly item: Item) {}
}
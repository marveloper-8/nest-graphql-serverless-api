import { CreateItemInput } from "@items/dto/create-item.input";
import { ICommand } from "@nestjs/cqrs";

export class CreateItemCommand implements ICommand {
  constructor(public readonly input: CreateItemInput) {}
}
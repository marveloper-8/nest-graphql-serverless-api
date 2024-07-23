import { UpdateItemInput } from "@items/dto/update-item.input";
import { ICommand } from "@nestjs/cqrs";

export class UpdateItemCommand implements ICommand {
  constructor(public readonly input: UpdateItemInput) {}
}
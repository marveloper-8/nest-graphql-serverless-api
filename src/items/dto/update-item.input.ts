import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateItemInput } from "./create-item.input";

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field()
  id: string;
}
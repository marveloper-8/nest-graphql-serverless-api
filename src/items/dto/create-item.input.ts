import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CreateItemInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(500)
  description?: string;
}
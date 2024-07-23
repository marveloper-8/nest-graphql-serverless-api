import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Item } from "./entities/item.entity";
import { CommandBus } from "@nestjs/cqrs";
import { DynamoDBService } from "@dynamodb/dynamodb.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@common/guards/auth.guard";
import { CreateItemInput } from "./dto/create-item.input";
import { CreateItemCommand } from "./commands/create-item.command";
import { UpdateItemInput } from "./dto/update-item.input";
import { UpdateItemCommand } from "./commands/update-item.command";
import { DeleteItemCommand } from "./commands/delete-item.command";

@Resolver(() => Item)
export class ItemResolver {
  constructor(
    private commandBus: CommandBus,
    private dynamoDBService: DynamoDBService,
  ) { }

  @Query(() => [Item])
  @UseGuards(AuthGuard)
  async items(): Promise<Item[]> {
    return this.dynamoDBService.findAll();
  }

  @Query(() => Item)
  @UseGuards(AuthGuard)
  async item(@Args('id') id: string): Promise<Item> {
    return this.dynamoDBService.findOne(id);
  }

  @Mutation(() => Item)
  @UseGuards(AuthGuard)
  async createItem(@Args('input') input: CreateItemInput): Promise<Item> {
    return this.commandBus.execute(new CreateItemCommand(input));
  }

  @Mutation(() => Item)
  @UseGuards(AuthGuard)
  async updateItem(@Args('input') input: UpdateItemInput): Promise<Item> {
    return this.commandBus.execute(new UpdateItemCommand(input));
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deleteItem(@Args('id') id: string): Promise<boolean> {
    return this.commandBus.execute(new DeleteItemCommand(id));
  }
}
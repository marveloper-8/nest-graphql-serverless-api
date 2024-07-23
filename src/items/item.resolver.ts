import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ItemService } from "./item.service";
import { Item } from "./item.entity";

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Query(() => Item)
  async item(@Args('id') id: string): Promise<Item> {
    return this.itemService.findOne(id)
  }
  
  @Mutation(() => Item)
  async createItem(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Item> {
    return this.itemService.create({ name, description })
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('id') id:string,
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Item> {
    return this.itemService.update(id, { name, description })
  }

  @Mutation(() => Boolean)
  async deleteItem(@Args('id') id: string): Promise<boolean> {
    await this.itemService.remove(id);
    return true
  }
}
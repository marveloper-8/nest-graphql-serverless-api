import { DynamoDBService } from "@dynamodb/dynamodb.service";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid'
import { Item } from "./item.entity";

@Injectable()
export class ItemService {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async create(data: Partial<Item>): Promise<Item> {
    const item: Item = {
      id: uuidv4(),
      ...data,
    };
    return this.dynamoDBService.create(item);
  }

  async findAll(): Promise<Item[]> {
    return this.dynamoDBService.findAll();
  }

  async findOne(id: string): Promise<Item> {
    return this.dynamoDBService.findOne(id)
  }

  async update(id: string, data: Partial<Item>): Promise<Item> {
    return this.dynamoDBService.update(id, data)
  }

  async remove(id: string): Promise<void> {
    return this.dynamoDBService.remove(id)
  }
}
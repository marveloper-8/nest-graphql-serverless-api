import { Injectable, Logger } from "@nestjs/common";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { ConfigService } from "@nestjs/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

@Injectable()
export class DynamoDBService {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;
  private readonly logger = new Logger(DynamoDBService.name);

  constructor(private configService: ConfigService) {
    const dbClient = new DynamoDBClient({
      region: this.configService.get<string>('AWS_REGION'),
    });

    this.docClient = DynamoDBDocumentClient.from(dbClient, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
    this.tableName = this.configService.get<string>('DYNAMODB_TABLE');
  }

  async create(item: any): Promise<any> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: item,
    });
    try {
      await this.docClient.send(command);
      return item;
    } catch (error) {
      this.logger.error(`Error creating item: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<any> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    });
    try {
      const response = await this.docClient.send(command);
      return response.Item;
    } catch (error) {
      this.logger.error(`Error finding item: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });
    try {
      const response = await this.docClient.send(command);
      return response.Items;
    } catch (error) {
      this.logger.error(`Error scanning items: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, item: any): Promise<any> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #name = :name, #description = :description',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#description': 'description',
      },
      ExpressionAttributeValues: {
        ':name': item.name,
        ':description': item.description,
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      const response = await this.docClient.send(command);
      return response.Attributes;
    } catch (error) {
      this.logger.error(`Error updating item: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    });
    try {
      await this.docClient.send(command);
    } catch (error) {
      this.logger.error(`Error deleting item: ${error.message}`);
      throw error;
    }
  }

  async query(keyConditionExpression: string, expressionAttributeValues: Record<string, any>): Promise<any[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    try {
      const response = await this.docClient.send(command);
      return response.Items;
    } catch (error) {
      this.logger.error(`Error querying items: ${error.message}`);
      throw error;
    }
  }
}
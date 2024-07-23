import { Injectable } from "@nestjs/common";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { ConfigService } from "@nestjs/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

@Injectable()
export class DynamoDBService {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private configService: ConfigService) {
    const dbClient = new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
      credentials: {
        accessKeyId: 'DEFAULT_ACCESS_KEY',
        secretAccessKey: 'DEFAULT_SECRET',
      }
    })

    this.docClient = DynamoDBDocumentClient.from(dbClient);
    this.tableName = this.configService.get<string>('dynamodb.tableName');
  }

  async create(item: any): Promise<any> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: item,
    })
    await this.docClient.send(command)
    return item;
  }

  async findOne(id: string): Promise<any> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { id },
    })
    const response = await this.docClient.send(command)
    return response.Item
  }

  async findAll(): Promise<any[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });
    const response = await this.docClient.send(command);
    return response.Items;
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
        ':description': item.description
      },
      ReturnValues: 'ALL_NEW',
    })
    const response = await this.docClient.send(command)
    return response.Attributes
  }

  async remove(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { id },
    })
    await this.docClient.send(command);
  }
}
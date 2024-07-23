import { DynamoDBService } from "@dynamodb/dynamodb.service";
import { CreateItemCommand } from "@items/commands/create-item.command";
import { DeleteItemCommand } from "@items/commands/delete-item.command";
import { UpdateItemCommand } from "@items/commands/update-item.command";
import { ItemResolver } from "@items/item.resolver";
import { CommandBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

describe('ItemResolver', () => {
  let resolver: ItemResolver;
  let commandBus: CommandBus;
  let dynamoDBService: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemResolver,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          }
        },
        {
          provide: DynamoDBService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          }
        }
      ]
    }).compile();

    resolver = module.get<ItemResolver>(ItemResolver);
    commandBus = module.get<CommandBus>(CommandBus);
    dynamoDBService = module.get<DynamoDBService>(DynamoDBService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  })

  describe('items', () => {
    it('should return an array of items', async () => {
      const result = [{ id: '1', name: 'Item 1' }]
      jest.spyOn(dynamoDBService, 'findAll').mockResolvedValue(result)

      expect(await resolver.items()).toBe(result)
    })
  })

  describe('item', () => {
    it('should return a single item', async () => {
      const result = { id: '1', name: 'Item 1' };
      jest.spyOn(dynamoDBService, 'findOne').mockResolvedValue(result)

      expect(await resolver.item('1')).toBe(result);
    });
  });

  describe('createItem', () => {
    it('should create an item', async () => {
      const input = { name: 'New Item' };
      const result = { id: '1', ...input };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(result);

      expect(await resolver.createItem(input)).toBe(result)
      expect(commandBus.execute).toHaveBeenCalledWith(new CreateItemCommand(input))
    })
  })

  describe('updateItem', () => {
    it('should update an item', async () => {
      const input = { id: '1', name: 'Updated Item' };
      const result = { ...input };
      jest.spyOn(commandBus, 'execute').mockResolvedValue(result);

      expect(await resolver.updateItem(input)).toBe(result);
      expect(commandBus.execute).toHaveBeenCalledWith(new UpdateItemCommand(input))
    })
  })

  describe('deleteItem', () => {
    it('should delete an item', async () => {
      const id = '1'
      jest.spyOn(commandBus, 'execute').mockResolvedValue(true)

      expect(await resolver.deleteItem(id)).toBe(true)
      expect(commandBus.execute).toHaveBeenCalledWith(new DeleteItemCommand(id))
    })
  })
})
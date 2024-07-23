import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { INestApplication } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import request from 'supertest'

describe('ItemResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true
        })
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('should create an item', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            createItem(input: { name: "Test Item" }) {
              id
              name
            }
          }
        `
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createItem).toHaveProperty('id');
        expect(res.body.data.createItem.name).toBe('Test Item');
      });
  });

  it('should query items', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            items {
              id
              name
            }
          }
        `
      })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body.data.items)).toBe(true)
      })
  })
})
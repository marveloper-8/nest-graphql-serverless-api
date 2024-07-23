import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@config/configuration';
import { CqrsModule } from '@nestjs/cqrs'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemModule } from '@items/item.module';
import { DynamoDBService } from '@dynamodb/dynamodb.service';
import { EventBusService } from '@events/event-bus.service';
import { EventPublisherService } from '@events/event-publisher.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: 'src/graphql/schema.gql',
        sortSchema: true,
        playground: configService.get<string>('NODE_ENV') !== 'production',
        introspection: configService.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    CqrsModule,
    ItemModule,
  ],
  providers: [DynamoDBService, EventBusService, EventPublisherService],
})
export class AppModule {}

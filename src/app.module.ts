import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@config/configuration';
import { CqrsModule } from '@nestjs/cqrs'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
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
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

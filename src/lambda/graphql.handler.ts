import { Server } from "http";
import express from 'express'
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { ExpressAdapter } from "@nestjs/platform-express";
import { eventContext } from 'aws-serverless-express/middleware'
import { createServer, proxy } from 'aws-serverless-express'
import { Context, Handler } from "aws-lambda";

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp)
    );

    nestApp.use(eventContext())
    await nestApp.init();

    cachedServer = createServer(expressApp)
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  const server = await bootstrap();
  return proxy(server, event, context, 'PROMISE').promise;
}
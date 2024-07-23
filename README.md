# NestJS GraphQL Serverless API by Joshua Samuel

## Overview

This project is a robust, production-ready GraphQL API built with NestJS and designed for serverless deployment. It showcases best practices in modern API development, including GraphQL implementation, authentication, caching, testing, and cloud-native design.

## Features

- **GraphQL API**: Utilizes NestJS's code-first approach with Apollo Server
- **Authentication**: JWT-based authentication with Guards and Strategies
- **Database**: PostgreSQL integration using Prisma ORM
- **Caching**: Redis-based caching for improved performance
- **Rate Limiting**: Built-in protection against abuse
- **Logging**: Comprehensive logging with Winston
- **Testing**: Extensive unit and e2e testing setup
- **Serverless**: Configured for deployment on AWS Lambda
- **Health Checks**: Integrated health check endpoints
- **Configuration Management**: Environment-based configuration using NestJS Config
- **API Documentation**: Auto-generated Swagger documentation
- **Code Quality**: ESLint and Prettier integration

## Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL
- Redis

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nestjs-graphql-serverless-api.git
   cd nestjs-graphql-serverless-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your specific details.

4. Generate Prisma client:
   ```
   npm run prisma:generate
   ```

5. Run database migrations:
   ```
   npm run prisma:migrate
   ```
 
6. Start the development server:
   ```
   npm run start:dev
   ```

7. Visit `http://localhost:3000/graphql` to access the GraphQL playground.

## Scripts

- `npm run build`: Build the application
- `npm run format`: Format code using Prettier
- `npm run start`: Start the application
- `npm run start:dev`: Start the application in watch mode
- `npm run start:prod`: Start the production application
- `npm run lint`: Lint the code
- `npm test`: Run unit tests
- `npm run test:e2e`: Run end-to-end tests
- `npm run deploy`: Deploy to AWS Lambda

## Project Structure

```
.
nest-graphql-serverless-api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   └── configuration.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   └── user.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   └── middleware/
│   │       └── correlation-id.middleware.ts
│   ├── graphql/
│   │   ├── schema.gql
│   │   └── graphql.module.ts
│   ├── items/
│   │   ├── entities/
│   │   │   └── item.entity.ts
│   │   ├── dto/
│   │   │   ├── create-item.input.ts
│   │   │   └── update-item.input.ts
│   │   ├── commands/
│   │   │   ├── create-item.command.ts
│   │   │   ├── update-item.command.ts
│   │   │   └── delete-item.command.ts
│   │   ├── events/
│   │   │   ├── item-created.event.ts
│   │   │   ├── item-updated.event.ts
│   │   │   └── item-deleted.event.ts
│   │   ├── handlers/
│   │   │   ├── create-item.handler.ts
│   │   │   ├── update-item.handler.ts
│   │   │   └── delete-item.handler.ts
│   │   ├── item.resolver.ts
│   │   ├── item.service.ts
│   │   └── item.module.ts
│   ├── dynamodb/
│   │   └── dynamodb.service.ts
│   ├── events/
│   │   ├── event-bus.service.ts
│   │   └── event-publisher.service.ts
│   └── lambda/
│       └── graphql.handler.ts
├── test/
│   ├── unit/
│   │   └── items/
│   │       ├── item.resolver.spec.ts
│   │       └── item.service.spec.ts
│   └── e2e/
│       └── items.e2e-spec.ts
├── serverless.yml
├── jest.config.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## API Documentation

Once the application is running, you can access the Swagger documentation at `http://localhost:3000/api`.

## GraphQL Playground

When running in development mode, the GraphQL Playground is available at `http://localhost:3000/graphql`.

## Testing

This project includes both unit tests and end-to-end tests.

Run unit tests:
```
npm test
```

Run e2e tests:
```
npm run test:e2e
```

## Deployment

This project is configured for serverless deployment on AWS Lambda. To deploy:

1. Ensure you have the AWS CLI installed and configured with your credentials.
2. Run `npm run deploy`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- NestJS team for their excellent framework and documentation
- The open-source community for their invaluable contributions

## Contact

For any inquiries or issues, please open an issue on this repository or contact [marveloper.8@gmail.com](mailto:marveloper.8@gmail.com).

---

Built with ❤️ using NestJS, GraphQL, and Serverless technologies.
```
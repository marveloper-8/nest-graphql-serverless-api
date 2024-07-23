import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();

    const status = exception.getStatus();
    const response = exception.getResponse();

    ctx.res.status(status).json({
      statusCode: status,
      message: response['message'] || exception.message,
    });
  }
}
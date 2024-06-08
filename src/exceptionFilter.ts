import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ConsoleLogger } from '@nestjs/common';
import { Request, Response } from 'express';


export class MyLoggerService extends ConsoleLogger {
  log(message: any, context?: string) {
    super.log(message, context ? `[${context}]` : undefined);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context ? `[${context}]` : undefined);
  }

  warn(message: any, context?: string) {
    super.warn(message, context ? `[${context}]` : undefined);
  }

  debug(message: any, context?: string) {
    super.debug(message, context ? `[${context}]` : undefined);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context ? `[${context}]` : undefined);
  }
}


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

      const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
  }
}




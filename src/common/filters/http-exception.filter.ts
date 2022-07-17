import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// Catch decorator
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    /*
    extract the following from the 'host' argument:
    - context(shorthand ctx), where switchToHttp give access to the native request or response obj
    - response using getResponse()
    */

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    /*
    extract the following from the 'exception' argument:
    - context(shorthand ctx), where switchToHttp give access to the native request or response obj
    - response using getResponse()
    - body 
    */
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse } // to change it to an obj if it is a string
        : (exceptionResponse as object);

    //setting the status code from the response we are sending back
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}

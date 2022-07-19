import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  //Always return true or false
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //getting a reference of the request obj
    //switchToHttp(): gives us access to the native request ans response and nest obj
    //getRequest(): return request wrapper obj
    const request = context.switchToHttp().getRequest<Request>();

    //getting the auth header from the request obj
    const authHeader = request.header('Authorization');
    return authHeader === process.env.API_KEY;
  }
}

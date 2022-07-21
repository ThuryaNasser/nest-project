import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    //the Reflector class allows us to retrieve the metadata within a context
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  //Always return true or false
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //retrieving the metadata by its key,and target value
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    //skipping the validation if the rout is public
    if (isPublic) {
      return true;
    }
    //getting a reference of the request obj
    //switchToHttp(): gives us access to the native request ans response and nest obj
    //getRequest(): return request wrapper obj
    const request = context.switchToHttp().getRequest<Request>();

    //getting the auth header from the request obj
    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
  }
}

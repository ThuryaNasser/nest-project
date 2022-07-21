import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
Interceptors make it possible for us to:
-bind extra logic before or after method execution
-transform the result returned from a method
-transform the exception thrown from a method
-extend basic method behavior
-completely overriding a method depending on a specific condition (for example:
   doing something like caching various responses)
*/
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    //handle() returns RxJS observable
    //map returns obj with a property called data -> { data: ourRealData }
    //data is the response sends back from the routs heder
    return next.handle().pipe(map((data) => ({ data })));
  }
}

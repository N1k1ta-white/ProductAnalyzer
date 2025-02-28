import { ExecutionContext, NestInterceptor, Injectable, CallHandler } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(map(data => instanceToPlain(data)));
  }
}

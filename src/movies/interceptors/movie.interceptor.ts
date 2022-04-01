import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  ClassConstructor,
  classToPlain,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class MovieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        // let genreArrays = data.genres;
        // let genres = genreArrays.map((genre: Genre) => genre.name);
        instanceToPlain(data);
      }),
    );
  }
}

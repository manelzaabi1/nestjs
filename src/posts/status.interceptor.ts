// src/posts/status.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const project = (post: any) => {
      if (!post) return post;
      if (post.status === true) return post;   // status true -> tout l'objet
      return { title: post.title };            // status false -> seulement title
    };

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) return data.map(project); // liste
        return project(data);                              // objet unique
      }),
    );
  }
}

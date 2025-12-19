import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PrixDtInterceptor implements NestInterceptor {
  // par ex. ajouter 0.19 DT de taxe (19 %) au prix
  private readonly tva = 0.19;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const addDt = (v: any) =>
      v && {
        ...v,
        prixAvecDt: v.prix != null ? v.prix + v.prix * this.tva : v.prix,
      };

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(addDt);
        }
        return addDt(data);
      }),
    );
  }
}

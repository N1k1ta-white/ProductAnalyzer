import { ExecutionContext, NestInterceptor, Injectable, CallHandler } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { Paginate, Paginated } from "nestjs-paginate";
import { map, Observable } from "rxjs";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/entities/product.entity";

@Injectable()
export class ProductInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {

    return next.handle().pipe(map((prod: Product) => {
        let prodResponse = instanceToPlain(prod)
        prodResponse.categoryId = prod.category.id
        delete prodResponse.category
        prodResponse.properties = prodResponse.properties.map(
            (property: { attr: { name: string }, value: string }) => {
                return {
                    name: property.attr?.name ?? 'Unknown',
                    value: property.value,
                }
            })
        return prodResponse
    }
    ));
  }
}

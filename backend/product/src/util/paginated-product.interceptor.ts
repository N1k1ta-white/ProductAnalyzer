import { ExecutionContext, NestInterceptor, Injectable, CallHandler } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { Paginate, Paginated } from "nestjs-paginate";
import { map, Observable } from "rxjs";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/entities/product.entity";

@Injectable()
export class PaginatedProductInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {

    return next.handle().pipe(map((data: Paginated<Product>) => {
      return {
        ...data,
        data: data.data.map(item => {
            let itemDto = instanceToPlain(item)
            itemDto.categoryId = item.category.id
            
            itemDto.properties = itemDto.properties.map(
              (property: { attr: { name: string }, value: string }) => {
                return {
                  name: property.attr?.name ?? 'Unknown',
                  value: property.value,
                }
              })

            delete itemDto.category
            return itemDto
          }
        )
      }
    }));
  }
}

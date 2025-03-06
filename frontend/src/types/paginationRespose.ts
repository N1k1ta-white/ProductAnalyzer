import { ProductReduxState } from "./product";

export interface paginationResponse{
    data:ProductReduxState[]
    meta:{
        itemsPerPage:number,
        totalItems:number,
        currentPage:number,
        totalPages:number
    }

    links:{
        previous:string,
        current:string,
        next:string
    }
}
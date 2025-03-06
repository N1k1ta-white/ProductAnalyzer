export interface paginationRequest{
    page?: number;
    limit?: number;
    sortBy?:[string,string][];
    searchBy?:string[];
    search?:string;
    filter?:{
        [column:string] : string | number;
    };
}
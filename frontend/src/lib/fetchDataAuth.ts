'use server';
import fetchData from "./fetch.ts";
async function fetchDataAuth<T>(url: string, options?: RequestInit): Promise<T> {
    return await fetchData(url, {
        ...options,
        headers: {
            'Authorization': localStorage.getItem(import.meta.env.VITE_JWT_KEY_TO_LOCAL_STORAGE??"") || ""
        }
    });

}
 export default fetchDataAuth
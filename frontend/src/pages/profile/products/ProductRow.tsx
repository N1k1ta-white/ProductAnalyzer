import {ProductReduxState} from "@/types/product.ts";
import {FaTrash} from 'react-icons/fa6'
import ProductForm from "@/components/forms/ProductForm.tsx";
// import store from "@/store/store.ts";
// import { fetchDeleteProduct } from "@/store/productsSlice.ts";

type Props = {
    product: ProductReduxState
    className?: string
}

export default function ProductRow({product, className}: Props) {
    const handleDelete = async () => {
        try {
            // const {id, images} = product
            // await store.dispatch(fetchDeleteProduct({id, images})).unwrap()
        } catch (error) {
            alert("Ошибка при удалении товара: " + (error as Error).message);
        }
    }

    return (
        <tr className={`border-b border-gray-100 ${className}`}>
            <td className='text-left p-3 text-sm/6 text-zinc-950 '>{product.id}</td>
            <td className='text-left p-3 text-sm/6'><p className='line-clamp-1'>{product.name}</p></td>
            <td className='text-left p-3 text-sm/6'>{product.categoryId}</td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'><p className='line-clamp-3'>{product.description}</p></td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'> <p className='line-clamp-1'>{product.price} USD</p> </td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'>{product.quantity}</td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'>
                <ul>
                    {
                        product.properties.map((prop, key) => {
                            return (
                                <li key={key}>
                                    {prop.name}:{prop.value}
                                </li>
                            )
                        })
                    }
                </ul>
            </td>
            <td>
                <div className='flex items-center justify-center gap-5'>
                    <ProductForm productToEdit={product}/>
                    <button onClick={handleDelete}><FaTrash color='red'/></button>
                </div>
            </td>
        </tr>
    )
}
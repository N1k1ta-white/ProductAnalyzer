import {OrderReduxState} from "@/types/order.ts";
import {FaPencil, FaTrash} from "react-icons/fa6";
// import store from "@/store/store.ts";
// import { fetchDeleteProduct } from "@/store/productsSlice.ts";

type Props = {
    order: OrderReduxState
    className?: string
}

export default function OrderRow({order, className}: Props) {
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
            <td className='text-left p-3 text-sm/6 text-zinc-950 '>{order.id}</td>
            <td className='text-left p-3 text-sm/6'>{order.customer}</td>
            <td className='text-left p-3 text-sm/6'>{order.date}</td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'>{order.totalSum}</td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'>{order.status}</td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'>
                <ul>
                    {
                        order.products.map((prod, k) => (
                            <li key={k}>
                                {prod}
                            </li>
                        ))
                    }
                </ul>
            </td>
            <td className='text-left p-3 text-sm/6 text-zinc-950'>
                <div className='flex items-center justify-center gap-5'>
                    <button onClick={handleDelete}><FaPencil color='black'/></button>
                    <button onClick={handleDelete}><FaTrash color='red'/></button>
                </div>
            </td>
        </tr>
    )
}
import {Input} from "@/components/ui/input.tsx";
import OrderRow from "@/pages/profile/orders/OrderRow.tsx";
import {OrderReduxState} from "@/types/order.ts";

const orders: OrderReduxState[] = [
  { id: 1, customer: "Иван Иванов", date: "2025-03-01", totalSum: 1500, status: "SENT", products: ["Товар A", "Товар B"] },
  { id: 2, customer: "Анна Петрова", date: "2025-03-02", totalSum: 3200, status: "SHIPPED", products: ["Товар C", "Товар D"] },
  { id: 3, customer: "Сергей Смирнов", date: "2025-03-03", totalSum: 2750, status: "IN PROGRESS", products: ["Товар E", "Товар F"] },
  { id: 4, customer: "Екатерина Сидорова", date: "2025-03-04", totalSum: 4000, status: "CANCEL", products: ["Товар G", "Товар H"] },
]

export default function OrdersPage() {
  return (
      <div className='flex flex-col gap-9 w-full'>
        <h1 className='text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white'>Orders</h1>
        <div className='flex flex-wrap justify-between items-center gap-4'>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center w-full max-w-md rounded-lg border border-gray-300 bg-white shadow-sm shadow-500/50">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                  >
                  <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                  />
                  </svg>
              </span>
              <Input
                  type="text"
                  placeholder="Type order products..."
                  className="w-full pl-10 pr-3 py-2 focus:border-neutral-500 text-gray-700 placeholder-gray-500 bg-white border-none rounded-lg focus:outline-none"
              />
            </div>
          </div>
        </div>
        {/*{loading && "Loading..."}*/}
        {/*{error && <div className='error'>Error: {error}</div>}*/}
        {
            orders && orders.length !== 0 &&
            <div className='overflow-x-auto'>
              <table className="min-w-full w-full">
                <thead className='border-b'>
                <tr>
                    <th className='p-3 text-sm font-medium tracking-wide w-20 text-gray-700 text-left'>No.</th>
                    <th className='p-3 text-sm font-medium tracking-wide w-52 text-gray-700 text-left'>Client</th>
                    <th className='p-3 text-sm font-medium tracking-wide w-52 text-gray-700 text-left'>Date</th>
                    <th className='p-3 text-sm font-medium tracking-wide w-24 text-gray-700 text-left'>Sum, USD</th>
                    <th className='p-3 text-sm font-medium tracking-wide w-32 text-gray-700 text-left'>Status</th>
                    <th className='p-3 text-sm font-medium tracking-wide w-24 text-gray-700 text-left'>Products</th>
                    <th className='p-3 text-sm font-medium tracking-wide w-20 text-gray-700 text-center'>Options</th>
                </tr>
                </thead>
                  <tbody>
                  {
                      orders.map((order) => {
                    return (
                        <OrderRow key={order.id} order={order} />
                    )
                  })
                }
                </tbody>
              </table>
            </div>
        }
        {
            orders && orders.length === 0 && <div>Нет товаров</div>
        }
      </div>
  );
}

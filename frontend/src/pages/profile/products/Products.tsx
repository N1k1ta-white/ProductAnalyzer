import {useSelector} from "react-redux";
import {RootState} from "@/store/store.ts";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import { ProductReduxState} from "@/types/product.ts";
import {damerauLevenshtein} from "@/lib/utils.ts";
import {ProductForm} from "@/components/forms/ProductForm.tsx";
import ProductRow from "@/pages/profile/products/ProductRow.tsx";
const products: ProductReduxState[] = [
    {
        id: 1,
        name: "Apple iPhone 14",
        quantity: 50,
        categoryId: "Smartphones",
        price: 999,
        description: "A powerful smartphone with an A15 Bionic chip and advanced camera system.",
        properties: [
            { name: "Screen Size", value: "6.1 inches" },
            { name: "Battery Life", value: "20 hours" }
        ]
    },
    {
        id: 2,
        name: "Samsung Galaxy S23",
        quantity: 30,
        categoryId: "Smartphones",
        price: 899,
        description: "A flagship phone with Snapdragon 8 Gen 2 and 120Hz display.",
        properties: [
            { name: "Screen Size", value: "6.8 inches" },
            { name: "Battery Life", value: "22 hours" }
        ]
    },
    {
        id: 3,
        name: "Sony WH-1000XM5",
        quantity: 25,
        categoryId: "Headphones",
        price: 399,
        description: "High-quality noise-canceling wireless headphones.",
        properties: [
            { name: "Battery Life", value: "30 hours" },
            { name: "Noise Cancellation", value: "Yes" }
        ]
    },
    {
        id: 4,
        name: "Dell XPS 15",
        quantity: 15,
        categoryId: "Laptops",
        price: 1799,
        description: "A high-end laptop with an OLED display and Intel Core i7.",
        properties: [
            { name: "RAM", value: "16GB" },
            { name: "Storage", value: "512GB SSD" }
        ]
    },
    {
        id: 5,
        name: "PlayStation 5",
        quantity: 20,
        categoryId: "Gaming Consoles",
        price: 499,
        description: "The latest PlayStation console with a powerful GPU and SSD storage.",
        properties: [
            { name: "Storage", value: "825GB SSD" },
            { name: "Ray Tracing", value: "Yes" }
        ]
    },
    {
        id: 6,
        name: "Apple MacBook Air M2",
        quantity: 40,
        categoryId: "Laptops",
        price: 1199,
        description: "A sleek and powerful laptop with Apple's M2 chip.",
        properties: [
            { name: "RAM", value: "8GB" },
            { name: "Storage", value: "256GB SSD" }
        ]
    },
    {
        id: 7,
        name: "Samsung 4K Smart TV",
        quantity: 18,
        categoryId: "TVs",
        price: 799,
        description: "A stunning 55-inch 4K TV with HDR and smart features.",
        properties: [
            { name: "Screen Size", value: "55 inches" },
            { name: "Refresh Rate", value: "120Hz" }
        ]
    },
    {
        id: 8,
        name: "Bose QuietComfort Earbuds II",
        quantity: 35,
        categoryId: "Earbuds",
        price: 249,
        description: "Premium noise-canceling wireless earbuds with superior sound quality.",
        properties: [
            { name: "Battery Life", value: "24 hours" },
            { name: "Water Resistance", value: "IPX4" }
        ]
    },
    {
        id: 9,
        name: "Logitech MX Master 3",
        quantity: 50,
        categoryId: "Accessories",
        price: 99,
        description: "An ergonomic and highly customizable wireless mouse.",
        properties: [
            { name: "Connectivity", value: "Bluetooth & USB" },
            { name: "Battery Life", value: "70 days" }
        ]
    },
    {
        id: 10,
        name: "Nikon Z6 II",
        quantity: 12,
        categoryId: "Cameras",
        price: 1999,
        description: "A high-performance full-frame mirrorless camera for professionals.",
        properties: [
            { name: "Sensor", value: "24.5MP Full-frame" },
            { name: "Video Resolution", value: "4K 60fps" }
        ]
    }
];


export default function Products() {
    //const { products, error, loading } = useSelector((state: RootState) => state.productsData);
    const [foundProducts, setFoundProducts] = useState<{products: ProductReduxState[], value: string}>({value: '', products: []});
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase(); // Получаем новое значение сразу
        const filteredSuggestions = products
            .map((product) => {
                const lowerName = product.name.toLowerCase();
                const isExactMatch = lowerName.includes(searchValue); // Проверяем вхождение строки
                return {
                    product,
                    distance: damerauLevenshtein(searchValue, lowerName),
                    priority: isExactMatch ? 0 : 1 // Приоритет 0, если есть вхождение
                };
            })
            .sort((a, b) => a.priority - b.priority || a.distance - b.distance) // Сначала точные, потом по DL
            .map((item) => item.product); // Берем только продукты
        setFoundProducts({
            value: searchValue,
            products: searchValue ? filteredSuggestions : []
        });
    };

    return (
        <div className='flex flex-col gap-9 w-full'>
            <h1 className='text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white'>Products</h1>
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
                            value={foundProducts.value}
                            onChange={handleSearch}
                            placeholder="Find product..."
                            className="w-full pl-10 pr-3 py-2 focus:border-neutral-500 text-gray-700 placeholder-gray-500 bg-white border-none rounded-lg focus:outline-none"
                        />
                    </div>
                    <ProductForm />
                </div>
            </div>
            {/*{loading && "Loading..."}*/}
            {/*{error && <div className='error'>Error: {error}</div>}*/}
            {
                foundProducts.products.length !== 0 &&
                <div className='overflow-x-auto'>
                    <h1 className="text-center text-xl font-bold underline">Найденные товары</h1>
                    <table className="min-w-full w-full">
                        <thead className="border-b">
                        <tr>
                            <th className="p-3 text-sm font-medium tracking-wide w-16 text-gray-700 text-left">No.</th>
                            <th className="p-3 text-sm font-medium tracking-wide w-44 text-gray-700 text-left">Name</th>
                            <th className="p-3 text-sm font-medium tracking-wide w-44 text-gray-700 text-left">Category</th>
                            <th className="p-3 text-sm font-medium tracking-wide w-96 text-gray-700 text-left">Description</th>
                            <th className="p-3 text-sm font-medium tracking-wide w-32 text-gray-700 text-left">Price, USD</th>
                            <th className="p-3 text-sm font-medium tracking-wide w-24 text-gray-700 text-left">Quantity</th>
                            <th className="p-3 text-sm font-medium tracking-wide w-20 text-gray-700 text-left">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            foundProducts.products.map((value: ProductReduxState) => {
                                return (
                                    <ProductRow className={'bg-green-200'} key={value.id} product={value}/>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            }
            {
                products && products.length !== 0 &&
                <div className='overflow-x-auto'>
                    <table className="min-w-full w-full">
                        <thead className='border-b'>
                        <tr>
                            <th className='p-3 text-sm font-medium tracking-wide w-20 text-gray-700 text-left'>No.</th>
                            <th className='p-3 text-sm font-medium tracking-wide w-52 text-gray-700 text-left'>Name</th>
                            <th className='p-3 text-sm font-medium tracking-wide w-52 text-gray-700 text-left'>Category</th>
                            <th className='p-3 text-sm font-medium tracking-wide w-96 text-gray-700 text-left'>Description</th>
                            <th className='p-3 text-sm font-medium tracking-wide w-32 text-gray-700 text-left'>Price,
                                USD
                            </th>
                            <th className='p-3 text-sm font-medium tracking-wide w-24 text-gray-700 text-left'>Quantity</th>
                            <th className='p-3 text-sm font-medium tracking-wide w-64 text-gray-700 text-left'>Properties</th>
                            <th className='p-3 text-sm font-medium tracking-wide w-20 text-gray-700 text-center'>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map((value: ProductReduxState) => {
                                return (
                                    <ProductRow key={value.id} product={value}/>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            }
            {
                products && products.length === 0 && <div>Нет товаров</div>
            }
        </div>
    )
};
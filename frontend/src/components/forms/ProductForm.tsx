import React, {useEffect, useRef, useState} from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import ModalProps from "@/components/modals/ModalProps.tsx"  // Assuming Modal component is available in your project
import { ProductReduxState, ProductAttribute } from "@/types/product.ts"; // Adjust path if needed
import { addProduct } from "@/store/productsSlice.ts";
import store from "@/store/store.ts";
import ModalError from "../modals/ModalError.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {damerauLevenshtein} from "@/lib/utils.ts";
import {Card} from "@/components/ui/card.tsx";

const categorise = ["Дом", "Одежда", "Электроника"]
const popularAttributes = [
    "Цвет", "Размер", "Вес", "Материал", "Производитель",
    "Гарантия", "Модель", "Страна производства", "Емкость", "Мощность"
];

export function AddProductModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const attrFieldRef = useRef(null);
    const [product, setProduct] = useState<ProductReduxState>({
        name: "",
        quantity: 1,
        categoryName: '',
        price: 0,
        description: "",
        attributes: [],
    });
    const [attribute, setAttribute] = useState<ProductAttribute>({ name: "", value: "" });
    const [isFocused, setIsFocused] = useState(false);
    const [error,setErrorState] = useState("");
    const [attributesSuggestions, setAttributesSuggestions] = useState<string[]>([]);

    const handleAddAttribute = () => {
        if (attribute.name && attribute.value) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                attributes: [...prevProduct.attributes, attribute],
            }));
            setAttribute({ name: "", value: "" });
        }
    };
    const handleAttributeInput = (event: React.ChangeEvent<HTMLInputElement> | string) => {
        const value = typeof event === 'string' ? event : event.target.value
        setAttribute({...attribute, name: value})

        if (value.length > 0) {
            const filteredSuggestions = popularAttributes
                .map(attr => ({
                    attr,
                    distance: damerauLevenshtein(value.toLowerCase(), attr.toLowerCase())
                }))
                .filter(item => item.distance <= 5) // Фильтруем только с дистанцией ≤ 5
                .sort((a, b) => a.distance - b.distance) // Сортируем по расстоянию
                .map(item => item.attr);

            setAttributesSuggestions(filteredSuggestions);
        } else {
            setAttributesSuggestions([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Product added:", product);
            await store.dispatch(addProduct(product)).unwrap();
            setIsModalOpen(false);
        } catch (error) {
            setErrorState((error as Error).message);
        }
    };

    useEffect(() => {
        const checkFocus = () => {
            setIsFocused(attrFieldRef.current === document.activeElement);
        };

        document.addEventListener("focusin", checkFocus);
        document.addEventListener("focusout", checkFocus);

        return () => {
            document.removeEventListener("focusin", checkFocus);
            document.removeEventListener("focusout", checkFocus);
        };
    }, []);


    return (
        <>
             {(error === "Internal server error") && (
                <ModalError
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Something went wrong ..."
                    message={error}
                />
            )}
            <Button onClick={() => setIsModalOpen(true)}>Add Product</Button>

            <ModalProps className="w-[50rem]" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="max-h-[50rem] overflow-y-auto pr-8 pl-2">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-xl font-bold">Add New Product</h1>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Product Name */}
                            <div className="flex row gap-2">
                                <div className="w-full flex flex-col gap-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={product.name}
                                        onChange={(e) => setProduct({...product, name: e.currentTarget.value})}
                                        placeholder="Product Name"
                                        required
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <Label htmlFor="categoryId">Category</Label>
                                    <Select value={product.categoryName} onValueChange={(e) => setProduct({...product, categoryName: e})}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Категория</SelectLabel>
                                                {
                                                    categorise.map((item, key) => {
                                                        return (
                                                            <SelectItem key={key} value={item}>{item}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex row gap-2">
                                <div className="w-full">
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={product.price}
                                        onChange={(e) => setProduct({...product, price: Number(e.currentTarget.value)})}
                                        placeholder="Price"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="quantity">Amount</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => setProduct({
                                            ...product,
                                            quantity: Number(e.currentTarget.value)
                                        })}
                                        placeholder="Amount"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    className="w-full resize-none h-32"
                                    value={product.description}
                                    onChange={(e) => setProduct({...product, description: e.currentTarget.value})}
                                    placeholder="Product Description"
                                />
                            </div>

                                {/* Product Attributes */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Product Attributes</h3>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-full">
                                        <Input
                                            type="text"
                                            ref={attrFieldRef}
                                            value={attribute.name}
                                            onChange={handleAttributeInput}
                                            placeholder="Attribute Name"
                                        />
                                        {
                                            isFocused && attributesSuggestions.length !== 0 &&
                                            <Card className="absolute w-full p-[0.4rem] pr-5 top-[120%] min-h-[5.7rem] overflow-y-auto max-h-[5.7rem] flex flex-col gap-2">
                                                    <ul className="flex flex-wrap gap-3">
                                                        {
                                                            attributesSuggestions.map((attr, key) => (
                                                                <li
                                                                    onMouseDown={(e) => {
                                                                        e.preventDefault();
                                                                        handleAttributeInput(attr);
                                                                    }}
                                                                    className="cursor-pointer bg-gray-200 rounded p-1 px-2" key={key}
                                                                >
                                                                    {attr}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                            </Card>
                                        }
                                    </div>
                                    <Input
                                        type="text"
                                        value={attribute.value}
                                        onChange={(e) => setAttribute({...attribute, value: e.target.value})}
                                        placeholder="Attribute Value"
                                    />
                                    <Button type="button" onClick={handleAddAttribute}>
                                        Add Attribute
                                    </Button>
                                </div>
                                <ul className="mt-4 space-y-2 h-16">
                                {product.attributes.length > 0 && (
                                        product.attributes.map((attr, index) => (
                                            <li key={index}>
                                                {attr.name}: {attr.value}{/*Add button to edit or remove or smth else*/}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            {/* Submit Button */}
                                <Button type="submit" className="w-full">
                                    Add Product
                                </Button>
                            </div>
                        </div>
                </form>
            </ModalProps>
        </>
);
}
export default AddProductModal;
import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import ModalProps from "@/components/modals/ModalProps.tsx"  // Assuming Modal component is available in your project
import { ProductReduxState, ProductAttribute } from "../../types/product.ts"; // Adjust path if needed
import { addProduct } from "@/store/productsSlice.ts";
import store from "@/store/store.ts";
import ModalError from "../modals/ModalError.tsx";

export function AddProductModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProduct] = useState<ProductReduxState>({
        name: "",
        quantity: 1,
        categoryId: 0,
        price: 0,
        description: "",
        attributes: [],
    });
    const [attribute, setAttribute] = useState<ProductAttribute>({ name: "", value: "" });
    const [error,setErrorState] = useState("");
    const handleAddAttribute = () => {
        if (attribute.name && attribute.value) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                attributes: [...prevProduct.attributes, attribute],
            }));
            setAttribute({ name: "", value: "" });
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

            <ModalProps isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-xl font-bold">Add New Product</h1>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Product Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={product.name}
                                    onChange={(e) => setProduct({ ...product, name: e.currentTarget.value })}
                                    placeholder="Product Name"
                                    required
                                />
                            </div>

                            {/* Product Price */}
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: Number(e.currentTarget.value) })}
                                    placeholder="Price"
                                    required
                                />
                            </div>

                             {/* Product Price */}
                             <div className="grid gap-2">
                                <Label htmlFor="quantity">Amount</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, quantity: Number(e.currentTarget.value) })}
                                    placeholder="Amount"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="categoryId">Category</Label>
                                <Input
                                    id="categoryId"
                                    type="number"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, categoryId: Number(e.currentTarget.value) })}
                                    placeholder="Category"
                                    required
                                />
                            </div>

                            {/* Product Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.currentTarget.value })}
                                    placeholder="Product Description"
                                />
                            </div>

                            {/* Product Attributes */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Product Attributes</h3>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="text"
                                        value={attribute.name}
                                        onChange={(e) => setAttribute({ ...attribute, name: e.currentTarget.value })}
                                        placeholder="Attribute Name"
                                    />
                                    <Input
                                        type="text"
                                        value={attribute.value}
                                        onChange={(e) => setAttribute({ ...attribute, value: e.currentTarget.value })}
                                        placeholder="Attribute Value"
                                    />
                                    <Button type="button" onClick={handleAddAttribute}>
                                        Add Attribute
                                    </Button>
                                </div>
                                {product.attributes.length > 0 && (
                                    <ul className="mt-4 space-y-2">
                                        {product.attributes.map((attr, index) => (
                                            <li key={index}>
                                                {attr.name}: {attr.value}{/*Add button to edit or remove or smth else*/}
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
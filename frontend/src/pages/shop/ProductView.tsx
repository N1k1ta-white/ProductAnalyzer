import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSelector } from "react-redux";
import { ProductReduxState } from '@/types/product';
import store, { RootState } from '@/store/store';
import { addOrder } from '@/store/ordersSlice';
import { OrderReduxState } from '@/types/order';

interface ContactInfo {
  address: string;
  phone: string;
  postalCode: string;
  email: string;
}

interface ContactErrors {
  address?: string;
  phone?: string;
  postalCode?: string;
  email?: string;
}

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<ProductReduxState>({
    name: "",
    quantity: 1,
    ownerId: 0,
    // Adjust the category type if needed; using any for demonstration
    category: { id: 0, name: "" },
    price: 0,
    description: "",
    properties: [],
  });

  const products = useSelector((state: RootState) => state.productsData.products);

  useEffect(() => {
    const foundProduct = products.find(p => p.id?.toString() === productId) as ProductReduxState;
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId, products]);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    address: "",
    phone: "",
    postalCode: "",
    email: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): ContactErrors => {
    const newErrors: ContactErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactInfo.address.trim()) {
      newErrors.address = "Address is required.";
    }
    if (!contactInfo.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!contactInfo.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    }
    if (!contactInfo.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(contactInfo.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    
    if (Object.keys(validationErrors).length === 0) {
      console.log("Contact Information Submitted:", contactInfo);
      await store.dispatch(addOrder(contactInfo));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <img src="https://github.com/shadcn.png" alt="Product" className='w-32 h-auto' />
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="font-semibold">Price:</span> ${product.price}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Quantity:</span> {product.quantity}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Description:</span>
            <p>{product.description}</p>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Product Attributes:</span>
            <ul className="list-disc ml-5">
              {product.properties.map((attr, index) => (
                <li key={index}>
                  {attr.name}: {attr.value}
                </li>
              ))}
            </ul>
          </div>
          <Badge variant="secondary">Category: {product.category.name}</Badge>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address" className="block text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={contactInfo.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={contactInfo.phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="postalCode" className="block text-sm font-medium">
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={contactInfo.postalCode}
                  onChange={handleInputChange}
                  placeholder="90210"
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <Button onClick={handleSubmit} type="submit" className="mt-4 w-full">
              Order now
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductPage;

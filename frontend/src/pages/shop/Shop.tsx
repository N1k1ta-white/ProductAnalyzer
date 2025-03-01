import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import ProfileNavigation from "@/components/ProfileNavigation";
import AddProductModal from "@/components/forms/ProductForm";
import { ProductReduxState } from "@/types/product";
import store from "@/store/store";
import { fetchProducts } from "@/store/productsSlice";
import ModalError from "@/components/modals/ModalError";

const ITEMS_PER_PAGE = 6;
// const cardsData = Array.from({ length: 30 }, (_, i) => ({
//   id: i + 1,
//   title: `Product ${i + 1}`,
//   description: `This is the description for product ${i + 1}.`,
// }));

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<ProductReduxState[]>([]);
  const [error, setErrorState] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  // const currentCards = cardsData.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );
  const handleAddToCart = (id?:number) => {
    //cart.add
    console.log("Gonna add product with id - " + id);//probably we need hook here idk roman?
  }
  const handlefetchProducts = async () => {
    try {
      const fetchedProducts = await store.dispatch(fetchProducts()).unwrap();
      setProducts(fetchedProducts);
    } catch (error) {
      setIsModalOpen(true);
      setErrorState((error as Error).message);
    }
  };
  useEffect(() => {
    handlefetchProducts(); // Fetch products when component mounts
  }, []);
  return (
    <div className="p-4 w-full display-flex h-screen-full">
      {error === "Cannot GET /products" && (
        <ModalError
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Try Again"
          message={error}
        />
      )}
      <div className="fixed bottom-4 right-4 z-10">
        <AddProductModal />
      </div>
      <nav className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Shop</h1>
        <NavigationMenu className="">
          <NavigationMenuList className="flex gap-4">
            {isAuthenticated ? (
              <NavigationMenuItem>
                <div className="flex gap-4">
                  <ProfileNavigation />
                </div>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/login">Sign In</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/register">
                    Register
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
        {products.map((card) => (
          <Card key={card.id}>
            <CardHeader className="flex justify-center w-full items-center ">
              <img
                src="https://github.com/shadcn.png"
                alt=""
                className="w-32 h-auto "
              />
              <CardTitle>{card.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
            <CardContent>
              <CardDescription>{card.price}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleAddToCart(card.id)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination className="flex justify-center mt-6 z-10]">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            ) : (
              <span className="opacity-50 cursor-not-allowed px-3 py-2 z-0">
                Previous
              </span>
            )}
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
                href="#"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
            ) : (
              <div className="cursor-pointer z-0">
                <span className="opacity-50 px-3 py-2 z-0">Next</span>
              </div>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

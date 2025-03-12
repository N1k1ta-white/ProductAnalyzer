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
import { ProductReduxState } from "@/types/product";
import store from "@/store/store";
import { fetchProducts } from "@/store/productsSlice";
import ModalError from "@/components/modals/ModalError";
import { SearchBlock } from "@/components/forms/SerchBlock";
import {FaEnvelope} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const ITEMS_PER_PAGE = 6;

export default function Shop() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Merged state
  const [state, setState] = useState({
    currentPage: 1,
    products: [] as ProductReduxState[],
    error: "",
    isModalOpen: false,
  });

  const totalPages = Math.ceil(state.products.length / ITEMS_PER_PAGE);

  // Helper function to update state
  const updateState = (newState: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  // Fetch products
  const handleFetchProducts = async () => {
    try {
      const fetchedProducts = await store.dispatch(fetchProducts()).unwrap();
      updateState({ products: fetchedProducts.data });
    } catch (error) {
      updateState({ isModalOpen: true, error: (error as Error).message });
    }
  };

  useEffect(() => {
    handleFetchProducts(); // Fetch products when component mounts
  }, []);

  const handleAddToCart = (id?: number) => {

  };
  const openProduct = (id: number) => {
    navigate(`/products/${id}`)
  }

  return (
    <div className="p-4 w-full display-flex h-screen-full">
      {state.error === "Cannot GET /products" && (
        <ModalError
          isOpen={state.isModalOpen}
          onClose={() => updateState({ isModalOpen: false })}
          title="Try Again"
          message={state.error}
        />
      )}

      <nav className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Shop</h1>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-lg">
            <SearchBlock />
          </div>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {isAuthenticated ? (
                <>
                  <NavigationMenuItem>
                    <div className="flex gap-4">
                      <FaEnvelope size={24} onClick={() => navigate("/profile/chats")}/>
                    </div>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <div className="flex gap-4">
                      <ProfileNavigation />
                    </div>
                  </NavigationMenuItem>
                </>
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
        {state.products
          .slice(
            (state.currentPage - 1) * ITEMS_PER_PAGE,
            state.currentPage * ITEMS_PER_PAGE
          )
          .map((card) => (
            <Card key={card.id}>
              <CardHeader className="flex justify-center w-full items-center">
                <img
                  onClick={ () => {openProduct(card.id as number)}}
                  src="https://github.com/shadcn.png"
                  alt=""
                  className="w-32 h-auto"
                />
                <CardTitle>{card.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
              <CardContent>
                <CardDescription>{card.price}$</CardDescription>
              </CardContent>
              <CardFooter>
              {isAuthenticated ? (
                <Button onClick={() => handleAddToCart(card.id)}>
                  Add to Cart
                </Button>) :
                 (<></>)}
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      <Pagination className="flex justify-center mt-6 z-10">
        <PaginationContent>
          <PaginationItem>
            {state.currentPage > 1 ? (
              <PaginationPrevious
                onClick={() =>
                  updateState({ currentPage: state.currentPage - 1 })
                }
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
                onClick={() => updateState({ currentPage: i + 1 })}
                isActive={state.currentPage === i + 1}
                href="#"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            {state.currentPage < totalPages ? (
              <PaginationNext
                onClick={() =>
                  updateState({ currentPage: state.currentPage + 1 })
                }
              />
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

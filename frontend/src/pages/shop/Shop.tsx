import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import { NavLink } from "react-router-dom";

const ITEMS_PER_PAGE = 6;
const cardsData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  description: `This is the description for product ${i + 1}.`,
}));

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated } = useAuth();
  const totalPages = Math.ceil(cardsData.length / ITEMS_PER_PAGE);
  const currentCards = cardsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 w-full display-flex h-full">
      <nav className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Shop</h1>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {isAuthenticated ? (
              <NavigationMenuItem>
                <div className="flex gap-4">
                <Avatar>
                  <NavLink to="profile/dashboard">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </NavLink>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="" variant="outline">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Keyboard shortcuts
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
        {currentCards.map((card) => (
          <Card key={card.id}>
            <CardHeader className="flex justify-center w-full items-center ">
              <img
                src="https://github.com/shadcn.png"
                alt=""
                className="w-32 h-auto "
              />
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination className="flex justify-center mt-6">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            ) : (
              <span className="opacity-50 cursor-not-allowed px-3 py-2">
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
              <span className="opacity-50 cursor-not-allowed px-3 py-2">
                Next
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

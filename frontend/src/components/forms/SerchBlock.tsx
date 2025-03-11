import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import store, { RootState } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useState } from "react";

export function SearchBlock() {
  // Fetch products from Redux store
  const suggestions = useSelector((state: RootState) => state.productsData.products);

  // State for managing the search query
  const [query, setQuery] = useState("");

  // Filter suggestions based on the query, limited to 5 results
  const filteredSuggestions = suggestions
    .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md relative">
      {/* Search Input */}
      <Command className="w-full">
        <CommandInput
          placeholder="Search..."
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
          onValueChange={setQuery} // Handle input change with onValueChange
        />

        {/* Only show CommandList if query is not empty */}
        {query && (
          <CommandList className="absolute left-0 top-full w-full bg-white shadow-lg rounded-md z-50">
            {filteredSuggestions.length === 0 ? (
              <CommandEmpty>No results found</CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions" className="z-10">
                {filteredSuggestions.map((item, index) => (
                  <CommandItem key={index} className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>

      {/* Filters Button */}
      <Button className="bg-gray-700 text-white px-4 py-2 rounded-md">Filters</Button>

      {/* Sorting Dropdown */}
      <Select>
        <SelectTrigger className="w-[180px] border px-3 py-2 rounded-md">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            <SelectItem value="atoz">A-Z</SelectItem>
            <SelectItem value="ztoa">Z-A</SelectItem>
            <SelectItem value="htol">Price High to Low</SelectItem>
            <SelectItem value="ltoh">Price Low to High</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

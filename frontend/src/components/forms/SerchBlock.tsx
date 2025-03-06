import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchBlock() {
    const suggestions = [
      "iPhone 11",
      "T-shirt Pivozavr",
      "IQ Calculator Offline",
      "Weather Watches",
      "FMI Shopper",
    ];
  
    return (
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md">
        {/* Search Input */}
        <Command className="relative w-full min-w-[250px]">
          <CommandInput placeholder="Search..." className="border p-2 rounded-md w-full" />
          <CommandList className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md">
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {suggestions.map((item, index) => (
                <CommandItem key={index} className="cursor-pointer hover:bg-gray-200 p-2 rounded">
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
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
  
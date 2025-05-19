"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Filter categories and their options
const filterOptions = {
  Country: ["Bangladesh", "USA", "Canada", "UK", "Australia"],
  Products: [
    "Computer IT",
    "Electronics",
    "Software",
    "Hardware",
    "Networking",
    "Security",
  ],
};

type FilterCategory = keyof typeof filterOptions;

export function FilterDropdowns() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    Country: [],
    Products: [],
  });

  // Toggle a filter selection
  const toggleFilter = (category: FilterCategory, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = [...prev[category]];

      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value],
        };
      }
    });
  };

  // Check if a filter is selected
  const isSelected = (category: FilterCategory, value: string) => {
    return selectedFilters[category].includes(value);
  };

  return (
    <div className="relative">
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open) setActiveCategory(null);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <div className="p-2 text-sm font-medium">Filter</div>
          <DropdownMenuSeparator />
          {Object.keys(filterOptions).map((category) => (
            <DropdownMenuItem
              key={category}
              className={cn(
                "flex justify-between cursor-default",
                activeCategory === category && "bg-black text-white"
              )}
              onMouseEnter={() => setActiveCategory(category as FilterCategory)}
              onClick={(e) => e.preventDefault()}
            >
              {category}
              {selectedFilters[category].length > 0 && (
                <span className="ml-auto text-xs bg-gray-200 text-gray-800 rounded-full px-2 py-0.5">
                  {selectedFilters[category].length}
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sub-menu for filter options */}
      {activeCategory && (
        <div className="absolute right-0 top-0 mt-10 bg-white rounded-md border shadow-md z-50 w-[180px]">
          <div className="p-2 text-sm font-medium">Filter</div>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-y-auto py-1">
            {filterOptions[activeCategory].map((option) => (
              <div
                key={option}
                className={cn(
                  "px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100",
                  isSelected(activeCategory, option) &&
                    "bg-black text-white hover:bg-black/90"
                )}
                onClick={() => toggleFilter(activeCategory, option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

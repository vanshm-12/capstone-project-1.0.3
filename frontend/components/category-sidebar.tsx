"use client";

import React from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { CATEGORIES, CategoryType } from "@/lib/categories";
import { BookFilter } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface CategorySidebarProps {
  methods?: UseFormReturn<BookFilter>;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategorySidebar({
  methods,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  const watchedCategory = useWatch({
    control: methods?.control,
    name: "category",
  });

  const activeCategory = methods
    ? watchedCategory || "All"
    : selectedCategory || "All";

  const handleSelect = (cat: CategoryType) => {
    if (methods) {
      methods.setValue("category", cat, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <aside className="w-56 shrink-0 border-r bg-card/20 p-3 flex flex-col h-full">
      <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 uppercase tracking-wider">
        Categories
      </div>
      <ScrollArea className="flex-1 mt-1 pr-2">
        <nav className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <Button
                key={cat}
                type="button"
                variant={isSelected ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleSelect(cat)}
                className="w-full justify-start text-xs font-normal"
              >
                {cat}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}

export default CategorySidebar;

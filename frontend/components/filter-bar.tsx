"use client";

import { UseFormReturn } from "react-hook-form";
import {
  RHFFormProvider,
  RHFTextField,
  RHFSelect,
} from "@/components/hook-form";
import {
  LANGUAGE_TYPE,
  FORMAT_TYPE,
  PRICE_TYPE,
  SORT_TYPE,
  BookFilter,
} from "@/lib/types";

const LANGUAGE_OPTIONS = [
  { label: "All Languages", value: LANGUAGE_TYPE.ALL },
  { label: "English", value: LANGUAGE_TYPE.ENGLISH },
  { label: "Hindi", value: LANGUAGE_TYPE.HINDI },
  { label: "Spanish", value: LANGUAGE_TYPE.SPANISH },
];

const FORMAT_OPTIONS = [
  { label: "All Formats", value: FORMAT_TYPE.ALL },
  { label: "Paperback", value: FORMAT_TYPE.PAPERBACK },
  { label: "Hardcover", value: FORMAT_TYPE.HARDCOVER },
  { label: "eBook", value: FORMAT_TYPE.EBOOK },
];

const PRICE_OPTIONS = [
  { label: "All Prices", value: PRICE_TYPE.ALL },
  { label: "Under ₹200", value: PRICE_TYPE.UNDER_200 },
  { label: "₹200 - ₹400", value: PRICE_TYPE.BETWEEN_200_400 },
  { label: "Above ₹400", value: PRICE_TYPE.ABOVE_400 },
];

const SORT_OPTIONS = [
  { label: "Relevance", value: SORT_TYPE.RELEVANCE },
  { label: "Price: Low to High", value: SORT_TYPE.PRICE_LOW_HIGH },
  { label: "Price: High to Low", value: SORT_TYPE.PRICE_HIGH_LOW },
  { label: "Customer Rating", value: SORT_TYPE.RATING },
];

interface FilterBarProps {
  methods: UseFormReturn<BookFilter>;
}

const FilterBar = ({ methods }: FilterBarProps) => {
  return (
    <RHFFormProvider methods={methods}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 border-b">
        <RHFTextField
          name="search_query"
          label="Search"
          placeholder="Search books..."
          className="w-full"
        />

        <RHFSelect
          name="language"
          label="Language"
          options={LANGUAGE_OPTIONS}
          className="w-full"
        />

        <RHFSelect
          name="format"
          label="Format"
          options={FORMAT_OPTIONS}
          className="w-full"
        />

        <RHFSelect
          name="price_range"
          label="Price Range"
          options={PRICE_OPTIONS}
          className="w-full"
        />

        <RHFSelect
          name="sort_by"
          label="Sort By"
          options={SORT_OPTIONS}
          className="w-full"
        />
      </div>
    </RHFFormProvider>
  );
};

export default FilterBar;

"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RHFSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const RHFSelect = ({
  name,
  label,
  placeholder,
  options,
}: RHFSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full space-y-1.5">
          {label && <Label htmlFor={name}>{label}</Label>}

          <Select
            value={field.value}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {error && <p className="text-xs text-destructive">{error.message}</p>}
        </div>
      )}
    />
  );
};

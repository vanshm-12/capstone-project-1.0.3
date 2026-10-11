"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "cn";

interface RHFCheckboxProps {
  name: string;
  label: string;
  className?: string;
  onChange?: (checked: boolean) => void;
}

export const RHFCheckbox = ({
  name,
  label,
  className,
  onChange,
}: RHFCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn("flex items-center gap-2", className)}>
          <Checkbox
            id={name}
            checked={Boolean(field.value)}
            onCheckedChange={(checked) => {
              const val = Boolean(checked);
              field.onChange(val);
              onChange?.(val);
            }}
          />
          <Label htmlFor={name} className="text-sm font-normal cursor-pointer select-none">
            {label}
          </Label>
        </div>
      )}
    />
  );
};

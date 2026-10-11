"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RHFTextFieldProps extends React.ComponentProps<typeof Input> {
  name: string;
  label?: string;
}

export const RHFTextField = ({
  name,
  label,
  className,
  ...props
}: RHFTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-1.5 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        {...register(name)}
        id={name}
        aria-invalid={Boolean(error)}
        className={className}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

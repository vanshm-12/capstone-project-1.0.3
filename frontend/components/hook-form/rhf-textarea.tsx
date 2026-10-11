"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RHFTextareaProps extends React.ComponentProps<typeof Textarea> {
  name: string;
  label?: string;
}

export const RHFTextarea = ({
  name,
  label,
  className,
  ...props
}: RHFTextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-1.5 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Textarea
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

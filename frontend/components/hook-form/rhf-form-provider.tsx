import React, { ReactNode } from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";

interface RHFFormProviderProps<T extends FieldValues = FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  className?: string;
}

export default function RHFFormProvider<T extends FieldValues = FieldValues>({
  children,
  methods,
  onSubmit,
  className,
}: RHFFormProviderProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

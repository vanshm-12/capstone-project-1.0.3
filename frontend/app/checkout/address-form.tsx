"use client";

import { useFormContext } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import { Button } from "@/components/ui/button";
import { defaultCheckoutValues, CheckoutFormValues } from "./types";

export function AddressForm() {
  const { reset } = useFormContext<CheckoutFormValues>();

  const useDefault = () => {
    reset(defaultCheckoutValues);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          Delivery Address
        </h3>
        <Button type="button" variant="outline" size="sm" onClick={useDefault}>
          Use Saved Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RHFTextField
          name="first_name"
          label="First Name"
          placeholder="First Name"
          required
        />
        <RHFTextField
          name="last_name"
          label="Last Name"
          placeholder="Last Name"
          required
        />
      </div>

      <RHFTextField
        name="address_line"
        label="Address"
        placeholder="Street address or flat number"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RHFTextField
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <RHFTextField name="city" label="City" placeholder="City" required />
          <RHFTextField name="pin" label="PIN Code" placeholder="000000" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RHFTextField
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="1234567890"
          required
        />
        <RHFTextField
          name="country"
          label="Country"
          placeholder="India"
          readOnly
        />
      </div>
    </div>
  );
}

export default AddressForm;

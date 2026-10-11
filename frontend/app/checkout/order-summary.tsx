"use client";

import { useState } from "react";
import { CreditCard, Tag } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RHFTextField } from "@/components/hook-form";
import { useCart } from "@/lib/cart-context";
import { CheckoutFormValues } from "./types";

export const VALID_COUPONS: Record<string, number> = {
  BOOK100: 100,
};

interface OrderSummaryProps {
  isSubmitting?: boolean;
}

export function OrderSummary({ isSubmitting = false }: OrderSummaryProps) {
  const { cart, subtotal } = useCart();
  const { watch, setValue } = useFormContext<CheckoutFormValues>();
  const coupon = watch("coupon") ?? "";
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");

  const discount = appliedCoupon ? VALID_COUPONS[appliedCoupon] ?? 0 : 0;
  const tax = Math.round(subtotal * 0.12);
  const deliveryCharge = 0;
  const grandTotal = Math.max(0, subtotal + tax + deliveryCharge - discount);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setCouponError("Enter a coupon code");
      setAppliedCoupon("");
      return;
    }
    if (!(code in VALID_COUPONS)) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon("");
      return;
    }
    setCouponError("");
    setAppliedCoupon(code);
    setValue("coupon", code);
  };

  const removeCoupon = () => {
    setAppliedCoupon("");
    setValue("coupon", "");
    setCouponError("");
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Payment Summary
        </CardTitle>
        <CardDescription className="text-xs mt-0.5">
          Review and finalize your order
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Price ({cart.length} items)</span>
            <span className="text-foreground font-medium">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-muted-foreground">
            <span>Tax (12% GST)</span>
            <span className="text-foreground font-medium">
              ₹{tax.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-muted-foreground">
            <span>Delivery Charges</span>
            <span className="text-emerald-500 font-medium">
              {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
            </span>
          </div>

          {appliedCoupon ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Tag className="size-3.5" />
                {appliedCoupon} (-₹{discount})
              </span>
              <Button
                type="button"
                onClick={removeCoupon}
                size="sm"
                className="h-8 text-xs px-3 mt-0.5"
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 items-start pt-1">
              <div className="flex-1">
                <RHFTextField
                  name="coupon"
                  placeholder="Enter Coupon (e.g. BOOK100)"
                  className="h-8 text-xs"
                />
              </div>
              <Button
                type="button"
                onClick={applyCoupon}
                size="sm"
                className="h-8 text-xs px-3 mt-0.5"
              >
                Apply
              </Button>
            </div>
          )}
          {couponError && (
            <p className="text-xs text-destructive">{couponError}</p>
          )}
        </div>

        <div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-foreground">
              Total Amount
            </span>
            <span className="text-base font-bold text-foreground">
              ₹{grandTotal}
            </span>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full flex items-center justify-center gap-2"
          >
            <CreditCard className="size-4" />
            {isSubmitting ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderSummary;

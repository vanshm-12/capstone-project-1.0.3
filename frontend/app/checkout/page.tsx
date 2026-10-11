"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { RHFFormProvider } from "@/components/hook-form";
import { useCart } from "@/lib/cart-context";
import { CartItemList } from "./cart-item-list";
import { AddressForm } from "./address-form";
import { OrderSummary, VALID_COUPONS } from "./order-summary";
import { CheckoutFormValues, defaultCheckoutValues } from "./types";
import EmptyCart from "./empty-cart";
import { useAuth } from "@/lib/auth-context";
import RequireAuth from "@/components/require-auth";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, subtotal } = useCart();

  const methods = useForm<CheckoutFormValues>({
    defaultValues: {
      ...defaultCheckoutValues,
      first_name: user?.name?.split(" ")[0] || defaultCheckoutValues.first_name,
      last_name: user?.name?.split(" ").slice(1).join(" ") || defaultCheckoutValues.last_name,
      email: user?.email || defaultCheckoutValues.email,
    },
  });

  const { handleSubmit } = methods;

  const onPayNow = (data: CheckoutFormValues) => {
    const couponCode = (data.coupon ?? "").trim().toUpperCase();
    const discount = VALID_COUPONS[couponCode] ?? 0;
    const tax = Math.round(subtotal * 0.12);
    const grandTotal = Math.max(0, subtotal + tax - discount);
    const date = new Date().getTime().toString(36).toUpperCase();

    const checkoutData = {
      coupon: couponCode,
      discount,
      tax,
      grandTotal,
      date,
    };

    const params = new URLSearchParams({
      checkout_data: JSON.stringify(checkoutData),
      amount: grandTotal.toString(),
      name: `${data.first_name} ${data.last_name}`.trim(),
      email: data.email,
      address: data.address_line,
      city: data.city,
      pin: data.pin,
      phone: data.phone,
    });

    router.push(`/checkout/payment?${params.toString()}`);
  };

  return (
    <RequireAuth>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
            <RHFFormProvider methods={methods} onSubmit={handleSubmit(onPayNow)}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-8">
                  <h2 className="text-base font-semibold text-foreground mb-4 tracking-wide">
                    Shopping Cart ({cart.length})
                  </h2>
                  <CartItemList />

                  <section className="pt-2">
                    <Separator className="mb-6" />
                    <AddressForm />
                  </section>
                </div>

                <div className="lg:col-span-4 sticky top-20">
                  <OrderSummary isSubmitting={false} />
                </div>
              </div>
            </RHFFormProvider>
          </main>
        </div>
      )}
    </RequireAuth>
  );
}

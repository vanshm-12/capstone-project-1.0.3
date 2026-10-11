"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { RHFFormProvider } from "@/components/hook-form";
import { useCart } from "@/lib/cart-context";
import { Order } from "@/lib/types";
import { useCreateOrderMutation } from "@/lib/api/orders";
import { CartItemList } from "./cart-item-list";
import { AddressForm } from "./address-form";
import { OrderSummary } from "./order-summary";
import { OrderSuccessDialog } from "./order-success-dialog";
import { CheckoutFormValues, defaultCheckoutValues } from "./types";
import EmptyCart from "./empty-cart";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [open, setOpen] = useState<
    { open: true; order: Order } | { open: false }
  >({ open: false });

  const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

  const methods = useForm<CheckoutFormValues>({
    defaultValues: defaultCheckoutValues,
  });

  const { handleSubmit } = methods;

  const onPayNow = async (data: CheckoutFormValues) => {
    const discount = data.coupon ? 100 : 0;
    const tax = Math.round(subtotal * 0.12);
    const grandTotal = Math.max(0, subtotal + tax - discount);
    const date = new Date().getTime().toString(36).toUpperCase();

    const payload: Order = {
      order_number: `ORD-${date}`,
      total: grandTotal,
      status: "confirmed",
      customer_name: `${data.first_name} ${data.last_name}`.trim(),
      customer_email: data.email,
      shipping_address: data.address_line,
      city: data.city,
      pin: data.pin,
      phone: data.phone,
      estimated_delivery: "3-5 Business Days",
      items: cart.map((item) => ({
        book_id: item.book.id,
        title: item.book.title,
        author: item.book.author,
        price: item.book.price,
        quantity: item.quantity,
        cover_image: item.book.cover_image,
      })),
    };

    try {
      const created = await createOrder(payload);
      setOpen({ open: true, order: created });
      clearCart();
    } catch {}
  };

  if (cart.length === 0 && !open.open) {
    return <EmptyCart />;
  }

  return (
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
              <OrderSummary isSubmitting={isPending} />
            </div>
          </div>
        </RHFFormProvider>
      </main>

      <OrderSuccessDialog data={open} close={() => setOpen({ open: false })} />
    </div>
  );
}

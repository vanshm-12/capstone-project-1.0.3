"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreditCard, Lock, ArrowLeft, Loader2, AlertCircle, CheckCircle, Calendar, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RHFFormProvider, RHFTextField } from "@/components/hook-form";
import { useCart } from "@/lib/cart-context";
import { Order } from "@/lib/types";
import { useCreateOrderMutation } from "@/lib/api/orders";
import RequireAuth from "@/components/require-auth";
import Link from "next/link";

interface PaymentFormValues {
  card_number: string;
  name_on_card: string;
  expiry: string;
  cvv: string;
  upi_id?: string;
  payment_method: "credit" | "debit" | "upi" | "wallet";
}

const PAYMENT_METHOD_LABELS: Record<PaymentFormValues["payment_method"], string> = {
  credit: "Credit Card",
  debit: "Debit Card",
  upi: "UPI",
  wallet: "Wallet",
};

const defaultPaymentValues: PaymentFormValues = {
  card_number: "",
  name_on_card: "",
  expiry: "",
  cvv: "",
  upi_id: "",
  payment_method: "credit",
};

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, subtotal, clearCart } = useCart();
  const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrderMutation();

  const [step, setStep] = useState<"payment" | "processing" | "success">("payment");
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [error, setError] = useState<string>("");

  const checkoutData = searchParams.get("checkout_data");
  const payableAmount = parseInt(searchParams.get("amount") || "0");
  const customerName = searchParams.get("name") || "";
  const customerEmail = searchParams.get("email") || "";
  const address = searchParams.get("address") || "";
  const city = searchParams.get("city") || "";
  const pin = searchParams.get("pin") || "";
  const phone = searchParams.get("phone") || "";

  const methods = useForm<PaymentFormValues>({
    defaultValues: {
      ...defaultPaymentValues,
      name_on_card: customerName,
    },
  });

  const { handleSubmit, watch, setValue } = methods;
  const paymentMethod = watch("payment_method");

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(" ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("card_number", formatCardNumber(e.target.value), { shouldValidate: true });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("expiry", formatExpiry(e.target.value), { shouldValidate: true });
  };

  const onSubmit = async (data: PaymentFormValues) => {
    setError("");

    if (!checkoutData) {
      setError("Invalid checkout session. Please try again.");
      return;
    }

    setStep("processing");

    try {
      const parsedCheckoutData = JSON.parse(checkoutData);
      const { grandTotal, date } = parsedCheckoutData;

      const payload: Order = {
        order_number: `ORD-${date}`,
        total: grandTotal,
        status: "confirmed",
        customer_name: customerName,
        customer_email: customerEmail,
        shipping_address: address,
        city: city,
        pin: pin,
        phone: phone,
        estimated_delivery: "3-5 Business Days",
        payment_method: data.payment_method,
        items: cart.map((item) => ({
          book_id: item.book.id,
          title: item.book.title,
          author: item.book.author,
          price: item.book.price,
          quantity: item.quantity,
          cover_image: item.book.cover_image,
        })),
      };

      const created = await createOrder(payload);
      setOrderData(created);
      clearCart();
      setStep("success");
    } catch {
      setError("Payment failed. Please try again.");
      setStep("payment");
    }
  };

  if (cart.length === 0 && step === "payment") {
    return (
      <RequireAuth>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
            <Card className="py-12 text-center text-muted-foreground p-6">
              <p className="text-sm">Your shopping cart is empty.</p>
              <Link
                href="/books"
                className="inline-block mt-3 text-xs text-primary hover:underline"
              >
                Browse bookstore catalog
              </Link>
            </Card>
          </main>
        </div>
      </RequireAuth>
    );
  }

  const tax = Math.round(subtotal * 0.12);
  const grandTotal = payableAmount || subtotal + tax;

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 px-8 py-6 max-w-3xl mx-auto w-full">
        <div className="mb-6">
          <Link
            href="/checkout"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Checkout
          </Link>
        </div>

        {step === "payment" && (
          <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card className="space-y-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Complete Payment</CardTitle>
                <CardDescription>
                  Enter your payment details to complete the order
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pb-6">
                <div className="flex gap-2 mb-4">
                  {(
                    Object.keys(PAYMENT_METHOD_LABELS) as PaymentFormValues["payment_method"][]
                  ).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setValue("payment_method", method)
                      }
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        paymentMethod === method
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {PAYMENT_METHOD_LABELS[method]}
                    </button>
                  ))}
                </div>

                {paymentMethod === "credit" || paymentMethod === "debit" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <RHFTextField
                          name="card_number"
                          placeholder="xxxx xxxx xxxx xxxx"
                          maxLength={19}
                          onChange={handleCardNumberChange}
                          required
                          className="pl-10"
                          inputMode="numeric"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Name on Card
                        </label>
                        <RHFTextField
                          name="name_on_card"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          CVV
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <RHFTextField
                            name="cvv"
                            placeholder="XXX"
                            maxLength={3}
                            type="password"
                            required
                            className="pl-10"
                            inputMode="numeric"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Date of Expiry
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <RHFTextField
                          name="expiry"
                          placeholder="MM/YYYY"
                          maxLength={7}
                          onChange={handleExpiryChange}
                          required
                          className="pl-10"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </div>
                ) : paymentMethod === "upi" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        UPI ID
                      </label>
                      <RHFTextField
                        name="upi_id"
                        placeholder="yourname@bank"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You will receive a payment request on your UPI app
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Wallet className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Wallet Balance</p>
                          <p className="text-sm text-muted-foreground">₹2,500.00 available</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Payment will be deducted from your wallet balance
                    </p>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="size-4" />
                    {error}
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Order Total</span>
                    <span className="font-medium text-foreground">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tax (12%)</span>
                    <span className="font-medium text-foreground">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-emerald-500 font-medium">Free</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Payable Amount</span>
                    <span className="text-primary">₹{grandTotal}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  type="submit"
                  disabled={isCreatingOrder}
                  className="w-full py-3 text-base"
                >
                  {isCreatingOrder ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-4 mr-2" />
                      Pay Now
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </RHFFormProvider>
        )}

        {step === "processing" && (
          <Card className="text-center py-12">
            <CardContent>
              <Loader2 className="size-10 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
              <p className="text-muted-foreground text-sm">Please wait while we process your payment...</p>
            </CardContent>
          </Card>
        )}

        {step === "success" && orderData && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto mb-4 p-3 rounded-full bg-emerald-100 dark:bg-emerald-950 w-fit">
                <CheckCircle className="size-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Your order{" "}
                <span className="font-mono text-foreground">
                  {orderData.order_number}
                </span>{" "}
                has been confirmed.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => router.push("/orders")}>
                  View Orders
                </Button>
                <Button onClick={() => router.push("/books")}>
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      </div>
    </RequireAuth>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentContent />
    </Suspense>
  );
}
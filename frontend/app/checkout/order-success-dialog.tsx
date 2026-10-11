"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Order } from "@/lib/types";

interface IDialogType {
  data: { open: true; order: Order } | { open: false };
  close: () => void;
}

export function OrderSuccessDialog({ data, close }: IDialogType) {
  if (!data.open) return null;

  return (
    <Dialog open={data.open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg">Payment Successful!</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground pt-2">
            Your order #{data.order.order_number || data.order.id} has been
            placed successfully and is being prepared for dispatch.
          </DialogDescription>
        </DialogHeader>

        <Card className="p-3.5 text-xs space-y-2 bg-muted/30">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID:</span>
            <span className="text-foreground font-mono font-medium">
              #{data.order.order_number || data.order.id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estimated Delivery:</span>
            <span className="text-foreground font-medium">
              {data.order.estimated_delivery}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Paid:</span>
            <span className="text-emerald-500 font-medium">
              ₹{data.order.total.toFixed(2)}
            </span>
          </div>
        </Card>

        <div className="flex items-center gap-2 mt-2">
          <Link href="/orders" className="flex-1">
            <Button className="w-full text-xs" onClick={close}>
              View My Orders <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full text-xs"
              onClick={close}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OrderSuccessDialog;

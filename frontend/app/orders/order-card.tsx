"use client";

import { XCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/types";
import { useCancelOrderMutation } from "@/lib/api/orders";
import OrderItemRow from "./order-item-row";

export function OrderCard({ order }: { order: Order }) {
  const { mutate: cancelOrder, isPending } = useCancelOrderMutation();

  const orderDate = order.created_at
    ? isNaN(Date.parse(order.created_at))
      ? order.created_at
      : new Date(order.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
    : "Recent";

  return (
    <Card>
      <CardHeader className="border-b px-5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">
            #{order.order_number || order.id}
          </span>
          <Badge variant="outline" className="text-[10px] capitalize">
            {order.status || "confirmed"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Ordered on {orderDate}
          </span>
        </div>
        <div className="text-xs font-semibold text-foreground">
          Total: ₹{order.total.toFixed(2)}
        </div>
      </CardHeader>

      <CardContent className="p-5 divide-y divide-border">
        {order.items.map((item) => (
          <OrderItemRow key={item.id} item={item} />
        ))}
      </CardContent>

      <CardFooter className="bg-muted/10 border-t py-2.5 px-5 flex items-center justify-between text-xs text-muted-foreground">
        <div>
          Estimated delivery:{" "}
          <span className="font-medium text-foreground">
            {order.estimated_delivery}
          </span>{" "}
          to {order.city}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive h-7 px-2 text-xs"
          disabled={isPending}
          onClick={() => order.id && cancelOrder(order.id)}
        >
          <XCircle className="size-3.5 mr-1" />
          {isPending ? "Cancelling..." : "Cancel Order"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OrderCard;

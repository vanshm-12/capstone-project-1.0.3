"use client";

import { Badge } from "@/components/ui/badge";
import { useOrdersQuery } from "@/lib/api/orders";
import NoOrders from "./no-orders";
import OrderCard from "./order-card";
import { useAuth } from "@/lib/auth-context";
import RequireAuth from "@/components/require-auth";

function OrdersContent() {
  const { user } = useAuth();
  const { data: orders = [], isLoading: isQueryLoading } = useOrdersQuery(
    user?.email,
  );

  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 px-8 py-6 max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                My Orders
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                Manage and track your recent book purchases
              </p>
            </div>
            <Badge variant="secondary" className="text-xs px-3 py-1">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </Badge>
          </div>

          {isQueryLoading ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <NoOrders />
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.order_number || order.id}
                  order={order}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </RequireAuth>
  );
}

export default function OrdersPage() {
  return <OrdersContent />;
}

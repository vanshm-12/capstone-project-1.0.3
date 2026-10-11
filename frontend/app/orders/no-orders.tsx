import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Package } from "lucide-react";
import Link from "next/link";

const NoOrders = () => (
  <Card className="py-16 text-center">
    <CardContent className="space-y-4">
      <div className="size-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
        <Package className="size-6" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground text-base">
          No orders placed yet
        </h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          When you complete checkout for books in your cart, your orders will
          appear here.
        </p>
      </div>
      <Link href="/">
        <Button size="sm" className="mt-2">
          Explore Bookstore <ArrowRight className="size-3.5 ml-1" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default NoOrders;

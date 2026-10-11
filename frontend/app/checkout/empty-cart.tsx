import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
        <ShoppingBag className="size-8" />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-foreground">
        Your cart is empty
      </h2>
      <p className="text-xs text-muted-foreground mt-1.5 max-w-sm">
        {`Looks like you haven't added any books yet. Explore our bookstore
            catalog to find your next great read.`}
      </p>
      <Link href="/" className="mt-5">
        <Button size="sm" className="text-xs">
          Browse Books
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;

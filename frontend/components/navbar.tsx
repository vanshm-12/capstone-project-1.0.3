"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logoutUser, isAuthenticated } = useAuth();

  const navLinks = [
    { label: "Books", href: "/" },
    { label: "Orders", href: "/orders" },
    { label: "Cart / Checkout", href: "/checkout" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Hi,{" "}
              <span className="text-foreground font-medium">{user?.name}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logoutUser}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="ghost" size="sm" className="text-xs">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="text-xs">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

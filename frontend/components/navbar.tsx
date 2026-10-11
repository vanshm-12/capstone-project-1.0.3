"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logoutUser, isAuthenticated } = useAuth();

  const navLinks = [
    { label: "Books", href: "/books" },
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
            {isAuthenticated && (
              <>
                <Link href="/orders" className="text-sm">
                  My Orders
                </Link>
                <Link href="/checkout" className="text-sm">
                  Checkout
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Hi{" "}
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
      </div>
    </header>
  );
};

export default Navbar;

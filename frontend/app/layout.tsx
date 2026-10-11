import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "cn";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/lib/theme-context";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookworm - Online Bookstore",
  description: "Browse, discover, and order books online.",
};

// Applies the persisted theme before the first paint so the default (dark)
// theme is never briefly flashed. Runs synchronously on the client.
const themeScript = `(function(){try{var t=localStorage.getItem("bookworm-theme");var d=t==="light"?false:true;var r=document.documentElement;r.classList.toggle("dark",d);r.classList.toggle("light",!d)}catch(e){}})();`;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Providers>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_UP: "/api/auth/signup",
    SIGN_IN: "/api/auth/signin",
    ME: "/api/auth/me",
  },
  PRODUCTS: {
    BASE: "/api/products",
    CATEGORIES: "/api/products/categories",
    BY_ID: (id: number) => `/api/products/${id}`,
    BY_SLUG: (slug: string) => `/api/products/slug/${slug}`,
  },
  ORDERS: {
    BASE: "/api/orders",
    BY_ID: (id: number) => `/api/orders/${id}`,
  },
} as const;

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
} as const;

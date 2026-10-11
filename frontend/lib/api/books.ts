import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { BookFilterApiParams } from "./types";
import { Book, BookFilter } from "../types";

export const getBooks = async (params?: BookFilter): Promise<Book[]> => {
  const queryParams: BookFilterApiParams = {};

  if (params?.sort_by) queryParams.sort_by = params.sort_by;
  if (params?.category && params.category !== "All")
    queryParams.category = params.category;
  if (params?.search_query?.trim())
    queryParams.search = params.search_query.trim();
  if (params?.language && params.language !== "all")
    queryParams.language = params.language;
  if (params?.format && params.format !== "all")
    queryParams.format = params.format;
  if (params?.price_range && params.price_range !== "all")
    queryParams.price_range = params.price_range;

  const data = await apiClient.get<Book[]>(API_ENDPOINTS.PRODUCTS.BASE, {
    params: queryParams,
  });
  return Array.isArray(data) ? data : [];
};

export const getBookBySlug = async (slug: string): Promise<Book | null> => {
  return apiClient.get<Book>(API_ENDPOINTS.PRODUCTS.BY_SLUG(slug));
};

export const getBookById = async (id: number): Promise<Book | null> => {
  return apiClient.get<Book>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
};

export const getCategories = async (): Promise<string[]> => {
  return apiClient.get<string[]>(API_ENDPOINTS.PRODUCTS.CATEGORIES);
};

export const useBooksQuery = (params: BookFilter) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => getBooks(params),
  });
};

export const useBookQuery = (slug: string) => {
  return useQuery({
    queryKey: ["book", slug],
    queryFn: () => getBookBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

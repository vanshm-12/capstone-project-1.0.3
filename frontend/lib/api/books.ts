import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { BookFilterApiParams } from "./types";
import { Book, BookFilter } from "../types";

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const DEFAULT_PAGE_SIZE = 12;

export const getBooks = async (
  params?: BookFilter,
  page = 0,
  size = DEFAULT_PAGE_SIZE
): Promise<PageResponse<Book>> => {
  const queryParams: BookFilterApiParams & {
    page?: number;
    size?: number;
  } = { page, size };

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

  const data = await apiClient.get<PageResponse<Book>>(
    API_ENDPOINTS.PRODUCTS.BASE,
    { params: queryParams }
  );
  return data;
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

export const useBooksQuery = (params: BookFilter, page: number) => {
  return useQuery({
    queryKey: ["books", params, page],
    queryFn: () => getBooks(params, page),
  });
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
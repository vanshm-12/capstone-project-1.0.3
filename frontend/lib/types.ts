export enum LANGUAGE_TYPE {
  ALL = "all",
  ENGLISH = "english",
  HINDI = "hindi",
  SPANISH = "spanish",
}

export enum FORMAT_TYPE {
  ALL = "all",
  PAPERBACK = "paperback",
  HARDCOVER = "hardcover",
  EBOOK = "ebook",
}

export enum PRICE_TYPE {
  ALL = "all",
  UNDER_200 = "under_200",
  BETWEEN_200_400 = "200_400",
  ABOVE_400 = "above_400",
}

export enum SORT_TYPE {
  RELEVANCE = "relevance",
  PRICE_LOW_HIGH = "price_low_high",
  PRICE_HIGH_LOW = "price_high_low",
  RATING = "rating",
}

export interface BookFilter {
  category?: string;
  search_query?: string;
  language?: LANGUAGE_TYPE;
  format?: FORMAT_TYPE;
  price_range?: PRICE_TYPE;
  sort_by?: SORT_TYPE;
}

export interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  author_bio?: string;
  description: string;
  detailed_description?: string;
  publisher?: string;
  price: number;
  original_price?: number;
  format?: FORMAT_TYPE | string;
  categories: string[];
  delivery_estimate?: string;
  rating: number;
  sales_count?: number;
  language?: string;
  cover_image: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface DeliveryAddress {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address_line: string;
  city: string;
  pin: string;
  country: string;
}

export interface OrderItem {
  id?: number;
  book_id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  cover_image?: string;
}

export interface Order {
  id?: number;
  order_number: string;
  created_at?: string;
  total: number;
  status: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  city: string;
  pin: string;
  phone: string;
  estimated_delivery?: string;
  items: OrderItem[];
}

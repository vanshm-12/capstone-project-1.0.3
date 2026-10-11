import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Order } from "../types";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export const getOrdersApi = async (email?: string): Promise<Order[]> => {
  const data = await apiClient.get<Order[]>(API_ENDPOINTS.ORDERS.BASE, {
    params: email ? { email } : undefined,
  });
  return Array.isArray(data) ? data : [];
};

export const createOrderApi = async (order: Order): Promise<Order> => {
  return await apiClient.post<Order>(API_ENDPOINTS.ORDERS.BASE, order);
};

export const cancelOrderApi = async (orderId: number): Promise<void> => {
  await apiClient.delete<void>(API_ENDPOINTS.ORDERS.BY_ID(orderId));
};

export const useOrdersQuery = (email?: string) => {
  return useQuery({
    queryKey: ["orders", email],
    queryFn: () => getOrdersApi(email),
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useCancelOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

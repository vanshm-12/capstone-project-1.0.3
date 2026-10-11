package com.example.demo.order.service;

import com.example.demo.order.model.Order;
import com.example.demo.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrders(String customerEmail) {
        if (customerEmail != null && !customerEmail.isBlank()) {
            return orderRepository.findByCustomerEmailIgnoreCaseOrderByCreatedAtDesc(customerEmail.trim());
        }
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Order> getOrderById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Transactional
    public boolean cancelOrder(Long id) {
        if (id == null) {
            return false;
        }
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

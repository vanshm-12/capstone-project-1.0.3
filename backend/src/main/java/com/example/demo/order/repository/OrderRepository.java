package com.example.demo.order.repository;

import com.example.demo.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByCreatedAtDesc();
    List<Order> findByCustomerEmailIgnoreCaseOrderByCreatedAtDesc(String email);
    Optional<Order> findByOrderNumber(String orderNumber);
}

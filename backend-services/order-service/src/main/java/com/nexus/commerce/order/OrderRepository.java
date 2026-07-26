package com.nexus.commerce.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    // Custom query method leveraging our idx_orders_customer_id index
    List<Order> findByCustomerId(String customerId);
}
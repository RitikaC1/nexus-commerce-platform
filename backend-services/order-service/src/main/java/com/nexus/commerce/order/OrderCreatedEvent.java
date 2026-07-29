package com.nexus.commerce.order;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public class OrderCreatedEvent {

    private String orderId;
    private String customerId;
    private BigDecimal totalAmount;
    private List<String> productIds;
    private ZonedDateTime timestamp;

    public OrderCreatedEvent() {}

    public OrderCreatedEvent(String orderId, String customerId, BigDecimal totalAmount, List<String> productIds) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.productIds = productIds;
        this.timestamp = ZonedDateTime.now();
    }

    // --- Getters & Setters ---
    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public List<String> getProductIds() { return productIds; }
    public void setProductIds(List<String> productIds) { this.productIds = productIds; }
    public ZonedDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(ZonedDateTime timestamp) { this.timestamp = timestamp; }
}
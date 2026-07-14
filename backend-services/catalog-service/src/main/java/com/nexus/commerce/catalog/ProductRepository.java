package com.nexus.commerce.catalog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    
    // Custom finder method leveraging the index we added in our database schema
    List<Product> findByCategory(String category);
    
    Optional<Product> findBySku(String sku);
}
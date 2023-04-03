package fr.springboot.api.repository;

import fr.springboot.api.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);
    List<Product> findAllByNameContaining(String infix);
    List<Product> findAllByCategory(String category);
}

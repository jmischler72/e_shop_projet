package fr.springboot.api.repository;

import fr.springboot.api.model.ECategory;
import fr.springboot.api.model.Product;
import jakarta.annotation.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByName(String name);
    List<Product> findAllByNameContaining(String infix);
    List<Product> findAllByCategory(ECategory category);

    @Query("""
       select a from Product a where
       (?1 is null or a.name like %?1% )
       and (?2 is null or a.category= ?2)
       """)
    List<Product> findFilteredProducts(String name, ECategory category);


}

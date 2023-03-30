package fr.springboot.api.controller;

import fr.springboot.api.model.Product;
import fr.springboot.api.repository.ProductRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping(value = { "", "/get-all" })
    public @NotNull Iterable<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/create")
    public @NotNull Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}

package fr.springboot.api.controller;

import fr.springboot.api.model.ECategory;
import fr.springboot.api.model.Product;
import fr.springboot.api.payload.request.FilterProductRequest;
import fr.springboot.api.repository.ProductRepository;
import fr.springboot.api.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping()
    public @NotNull Iterable<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/categories")
    public Iterable<ECategory> getCategories() {
        return List.of(ECategory.values());
    }

    @GetMapping(value = {"/category/{category}"})
    public @NotNull Iterable<Product> getProductsByCategory(@PathVariable(value = "category") String category) {
        System.out.println(category);
        ECategory category_enum = ECategory.valueOf(category);
        return productRepository.findAllByCategory(category_enum);
    }

    @GetMapping(value = {"/id/{id}"})
    public @NotNull ResponseEntity<?> getProductById(@PathVariable(value = "id") Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>("No product found", HttpStatus.NOT_FOUND);

    }

    @GetMapping("/ids")
    public ResponseEntity<?> getProductsByIds(@RequestParam("ids") List<String> ids) {
        // Replace this example implementation with your logic to fetch the products from the database or any other source
        List<Product> products = new ArrayList<>();

        // Add logic to fetch the products based on the provided IDs
        for (String id : ids) {
            // Example: Fetch product from a data source using the ID
            Optional<Product> product = productRepository.findById(Long.valueOf(id));
            product.ifPresent(products::add);
        }
        if (products.isEmpty()) {
            return new ResponseEntity<>("No product found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/filter")
    public ResponseEntity<?> getFilteredProducts(@Valid @RequestBody FilterProductRequest filters) {
        // Replace this example implementation with your logic to fetch the products from the database or any other source
        List<Product> products = new ArrayList<>();

        products = productRepository.findFilteredProducts(filters.getByName(), filters.getByCategory());


        return new ResponseEntity<>(products, HttpStatus.OK);
    }
//
//    @GetMapping(value = {  "/get-name/{name}" })
//    public @NotNull Iterable<Product> getProductsByName(@PathVariable(value = "name") String name) {
//        return productRepository.findByName(name);
//    }
//
//    @GetMapping(value = {  "/get-string/{string}" })
//    public @NotNull Iterable<Product> getProductsByString(@PathVariable(value = "string") String string) {
//        return productRepository.findAllByNameContaining(string);
//    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public @NotNull Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public @NotNull ResponseEntity<?> deleteProduct(@PathVariable(value = "id") Long id) {
        if (!productRepository.existsById(id))
            return new ResponseEntity<>("No product matches this id", HttpStatus.NOT_FOUND);

        productRepository.deleteById(id);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")

    @PutMapping("/update")
    public @NotNull ResponseEntity<?> updateProduct(@RequestBody Product productUpdated) {
        Optional<Product> productToUpdate = productRepository.findById(productUpdated.getId());
        if (productToUpdate.isEmpty()) return new ResponseEntity<>("No product matches this id", HttpStatus.NOT_FOUND);

        Product product = productToUpdate.get();
        product.setName(productUpdated.getName());
        product.setPrice(productUpdated.getPrice());
        product.setPictureUrl(product.getPictureUrl());
        product.setCategory(product.getCategory());
        productRepository.save(product);

        return new ResponseEntity<>("Product updated", HttpStatus.OK);
    }
}
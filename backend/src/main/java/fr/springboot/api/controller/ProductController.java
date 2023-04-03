package fr.springboot.api.controller;

import fr.springboot.api.model.Category;
import fr.springboot.api.model.Product;
import fr.springboot.api.repository.ProductRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping(value = {  "/get-all" })
    public @NotNull Iterable<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping(value = {  "/get-by-category/{category}" })
    public @NotNull Iterable<Product> getProductsByCategory(@PathVariable(value = "category") String category) {
        return productRepository.findAllByCategory(category);
    }

    @GetMapping(value = {  "/get-categories" })
    public @NotNull Iterable<Category> getCategories() {
        return Arrays.stream(Category.values()).toList();
    }

    @GetMapping(value = {  "/get/{id}" })
    public @NotNull Product getProductById(@PathVariable(value = "id") Long id) {
        return productRepository.findById(id).get();
    }

    @GetMapping(value = {  "/get-name/{name}" })
    public @NotNull Iterable<Product> getProductsByName(@PathVariable(value = "name") String name) {
        return productRepository.findByName(name);
    }

    @GetMapping(value = {  "/get-string/{string}" })
    public @NotNull Iterable<Product> getProductsByString(@PathVariable(value = "string") String string) {
        return productRepository.findAllByNameContaining(string);
    }

    @PostMapping("/create")
    public @NotNull Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/delete/{id}")
    public @NotNull ResponseEntity<?> deleteProduct(@PathVariable(value = "id") Long id) {
        if(!productRepository.existsById(id)) return new ResponseEntity<>("No product matches this id", HttpStatus.NOT_FOUND);

        productRepository.deleteById(id);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }

    @PutMapping("/update")
    public @NotNull ResponseEntity<?> updateProduct(@RequestBody Product productUpdated) {
        if(!productRepository.existsById(productUpdated.getId())) return new ResponseEntity<>("No product matches this id", HttpStatus.NOT_FOUND);

        Product product = productRepository.findById(productUpdated.getId()).get();
        product.setName(productUpdated.getName());
        product.setPrice(productUpdated.getPrice());
        product.setPictureUrl(product.getPictureUrl());
        productRepository.save(product);

        return new ResponseEntity<>("Product updated", HttpStatus.OK);
    }
}
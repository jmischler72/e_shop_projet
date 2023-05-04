package fr.springboot.api.controller;

import fr.springboot.api.model.Product;
import fr.springboot.api.repository.ProductRepository;
import fr.springboot.api.security.services.UserDetailsImpl;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @GetMapping()
    public @NotNull Iterable<Product> getProducts(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        System.out.println(userDetails.getUsername());
        return productRepository.findAll();
    }

//    @GetMapping(value = {  "/get-by-category/{category}" })
//    public @NotNull Iterable<Product> getProductsByCategory(@PathVariable(value = "category") String category) {
//        return productRepository.findAllByCategory(category);
//    }
//
//    @GetMapping(value = {  "/{id}" })
//    public @NotNull Product getProductById(@PathVariable(value = "id") Long id) {
//        return productRepository.findById(id).get();
//    }
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
        if(!productRepository.existsById(id)) return new ResponseEntity<>("No product matches this id", HttpStatus.NOT_FOUND);

        productRepository.deleteById(id);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")

    @PutMapping("/update")
    public @NotNull ResponseEntity<?> updateProduct(@RequestBody Product productUpdated) {
        Optional<Product> productToUpdate = productRepository.findById(productUpdated.getId());
        if(productToUpdate.isEmpty()) return new ResponseEntity<>("No product matches this id", HttpStatus.NOT_FOUND);

        Product product = productToUpdate.get();
        product.setName(productUpdated.getName());
        product.setPrice(productUpdated.getPrice());
        product.setPictureUrl(product.getPictureUrl());
        product.setCategory(product.getCategory());
        productRepository.save(product);

        return new ResponseEntity<>("Product updated", HttpStatus.OK);
    }
}
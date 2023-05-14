package fr.springboot.api.controller;

import fr.springboot.api.dto.OrderItemDto;
import fr.springboot.api.model.*;
import fr.springboot.api.repository.OrderItemRepository;
import fr.springboot.api.repository.OrderRepository;
import fr.springboot.api.repository.ProductRepository;
import fr.springboot.api.repository.UserRepository;
import fr.springboot.api.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderItemRepository orderItemRepository;
    @Autowired
    ProductRepository productRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody List<OrderItemDto> shoppingCart, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Optional<User> user = userRepository.findByEmail(userDetails.getUsername());

        if (user.isEmpty()) {
            return new ResponseEntity<>("No account found", HttpStatus.NOT_FOUND);
        }

        Order order = new Order();
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemDto item : shoppingCart) {
            Optional<Product> product = productRepository.findById(item.getProductId());

            if (product.isEmpty()) {
                return new ResponseEntity<>("The product with the id: " + item.getProductId() + "was not found", HttpStatus.NOT_FOUND);
            }

            if (product.get().getStock() == 0) {
                return new ResponseEntity<>("The product " + product.get().getName() + " is not in stock", HttpStatus.OK);
            }

            OrderItem orderItem = new OrderItem(order, product.get(), item.getQuantity());
            orderItemRepository.save(orderItem);
            this.updateStock(product.get(), item.getQuantity());
            orderItems.add(orderItem);
        }


        order.setDateCreated(LocalDate.now());
        order.setUserId(user.get().getId());
        order.setProducts(orderItems);

        orderRepository.save(order);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    private void updateStock(Product product, int quantity) {
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }

    @GetMapping("/get-all-for/{id}")
    public ResponseEntity<?> getAllOrdersByUserId(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            return new ResponseEntity<>("No account matches this id", HttpStatus.NOT_FOUND);
        }

        List<Order> orders = orderRepository.findAllByUserId(id);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();
    }

}

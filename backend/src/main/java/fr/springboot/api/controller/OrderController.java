package fr.springboot.api.controller;

import fr.springboot.api.dto.OrderItemDto;
import fr.springboot.api.model.*;
import fr.springboot.api.repository.OrderItemRepository;
import fr.springboot.api.repository.OrderRepository;
import fr.springboot.api.repository.ProductRepository;
import fr.springboot.api.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("api/order")
public class OrderController {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderItemRepository orderItemRepository;
    @Autowired
    ProductRepository productRepository;

    @PostMapping("/create/{id}")
    public ResponseEntity<?> createOrder(@RequestBody ShoppingCart shoppingCart, @PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()) {
            return new ResponseEntity<>("No account matches this id", HttpStatus.NOT_FOUND);
        }

        Order order = new Order();
        List<OrderItemDto> orderItemsDtos = shoppingCart.getProductItems();
        List<OrderItem> orderItems = new ArrayList<>();
        order = orderRepository.save(order);

        for (OrderItemDto entry : orderItemsDtos) {
            if (entry.getProduct().getStock() == 0) {
                return new ResponseEntity<>("The product "+entry.getProduct().getId()+" is not in stock", HttpStatus.BAD_REQUEST);
            }

            OrderItem orderItem = new OrderItem(order, entry.getProduct(), entry.getQuantity());
            orderItemRepository.save(orderItem);
            updateStock(entry.getProduct(), entry.getQuantity());
            orderItems.add(orderItem);
        }

        order.setDateCreated(LocalDate.now());
        order.setUserId(user.get().getId());
        order.setProducts(orderItems);

        orderRepository.save(order);

        String uri = ServletUriComponentsBuilder
                .fromCurrentServletMapping()
                .path("/api/orders/{id}")
                .buildAndExpand(order.getId())
                .toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    private void updateStock(Product product, int quantity) {
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }

    @GetMapping("/get-all-for/{id}")
    public ResponseEntity<?> getAllOrdersByUserId(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()) {
            return new ResponseEntity<>("No account matches this id", HttpStatus.NOT_FOUND);
        }

        List<Order> orders = orderRepository.findAllByUserId(id);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public static class ShoppingCart {

        private List<OrderItemDto> productItems;

        public List<OrderItemDto> getProductItems() {
            return productItems;
        }

        public void setProductItems(List<OrderItemDto> productItems) {
            this.productItems = productItems;
        }
    }
}

package fr.springboot.api.repository;

import fr.springboot.api.model.OrderItem;
import fr.springboot.api.model.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
}

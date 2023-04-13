package fr.springboot.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

@Entity
public class OrderItem {
    @EmbeddedId
    @JsonIgnore
    private OrderItemPK pk;

    public OrderItem() {
        super();
    }

    public OrderItem(Order order, Product product, Integer quantity) {
        pk = new OrderItemPK();
        pk.setOrder(order);
        pk.setProduct(product);
        this.quantity = quantity;
    }

    @Transient
    public Product getProduct() {
        return this.pk.getProduct();
    }

    @Transient
    public Double getTotalPrice() {
        return getProduct().getPrice() * getQuantity();
    }

    public OrderItemPK getPk() {
        return pk;
    }

    public void setPk(OrderItemPK pk) {
        this.pk = pk;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Column(name = "quantity")
    @NotNull
    private int quantity;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((pk == null) ? 0 : pk.hashCode());

        return result;
    }
}

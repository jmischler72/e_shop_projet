package fr.springboot.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "orders")
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="products")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @JsonFormat(pattern = "dd/MM/yyyy") private LocalDate dateCreated;
    @OneToMany(mappedBy = "pk.order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderItem> products;

    @Transient
    public Double getTotalOrderPrice() {
        double sum = 0D;
        List<OrderItem> products = getProducts();
        for (OrderItem item : products) {
            sum += item.getTotalPrice();
        }

        return sum;
    }

    @Transient
    public int getNumberOfProducts() {
        return this.products.size();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<OrderItem> getProducts() {
        return products;
    }

    public void setProducts(List<OrderItem> products) {
        this.products = products;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }
}

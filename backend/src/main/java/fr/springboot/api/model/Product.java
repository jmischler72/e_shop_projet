package fr.springboot.api.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Table(name = "product")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Basic(optional = false)
    @Column(name = "name")
    @Nonnull
    private String name;

    @Column(name = "price")
    @Nonnull
    private Double price;

    @Column(name = "stock")
    private int stock;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Column(name = "category")
    private String category;
    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }
    public String getCategory() {
        return category;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}


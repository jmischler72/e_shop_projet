package fr.springboot.api.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

@Table(name = "product")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic(optional = false)
    @Nonnull
    private String name;

    @Nonnull
    private Double price;

    private String pictureUrl;

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }
}

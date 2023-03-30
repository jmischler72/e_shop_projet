package fr.springboot.api.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Basic;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic(optional = false)
    @Nonnull
    private String name;

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

package fr.springboot.api.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import org.checkerframework.common.aliasing.qual.Unique;

@Table(name = "user")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic(optional = false)
    @Nonnull
    private String email;
    private String password;

    public Long getId() {
        return id;
    }

    public void hashPassword() {
        this.password = String.valueOf(this.password.hashCode());
    }
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}

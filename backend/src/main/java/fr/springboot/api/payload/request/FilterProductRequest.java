package fr.springboot.api.payload.request;

import fr.springboot.api.model.ECategory;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Null;

public class FilterProductRequest {
    private String byName;
    private ECategory byCategory;

    public String getByName() {
        return byName;
    }

    public void setByName(String byName) {
        this.byName = byName;
    }

    public ECategory getByCategory() {
        return byCategory;
    }

    public void setByCategory( ECategory byCategory) {
        this.byCategory = byCategory;
    }
}

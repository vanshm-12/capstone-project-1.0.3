package com.example.demo.product.model;

public enum PriceRange {
    ALL("all"),
    UNDER_200("under_200"),
    BETWEEN_200_400("200_400"),
    ABOVE_400("above_400");

    private final String value;

    PriceRange(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static PriceRange fromString(String text) {
        if (text == null || text.isBlank()) {
            return ALL;
        }
        String clean = text.replace("-", "_").toLowerCase();
        for (PriceRange pr : PriceRange.values()) {
            if (pr.value.equalsIgnoreCase(clean) || pr.name().equalsIgnoreCase(clean)) {
                return pr;
            }
        }
        return ALL;
    }
}


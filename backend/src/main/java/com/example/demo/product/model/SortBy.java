package com.example.demo.product.model;

public enum SortBy {
    RELEVANCE("relevance"),
    PRICE_LOW_HIGH("price_low_high"),
    PRICE_HIGH_LOW("price_high_low"),
    RATING("rating");

    private final String value;

    SortBy(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static SortBy fromString(String text) {
        if (text == null || text.isBlank()) {
            return RELEVANCE;
        }
        String clean = text.replace("-", "_").toLowerCase();
        for (SortBy b : SortBy.values()) {
            if (b.value.equalsIgnoreCase(clean) || b.name().equalsIgnoreCase(clean)) {
                return b;
            }
        }
        return RELEVANCE;
    }
}


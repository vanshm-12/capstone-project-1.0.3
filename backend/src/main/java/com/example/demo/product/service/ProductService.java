package com.example.demo.product.service;

import com.example.demo.product.model.PriceRange;
import com.example.demo.product.model.Product;
import com.example.demo.product.model.SortBy;
import com.example.demo.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getProducts(String sortBy, String category, String search,
                                     String language, String format, String priceRange,
                                     Pageable pageable) {
        SortBy sortEnum = SortBy.fromString(sortBy);
        PriceRange priceEnum = PriceRange.fromString(priceRange);

        List<Product> filtered = productRepository.findAll().stream()
                .filter(p -> {
                    if (category != null && !category.equalsIgnoreCase("all") && !category.isBlank()) {
                        if (p.getCategories() == null
                                || p.getCategories().stream().noneMatch(c -> c.equalsIgnoreCase(category))) {
                            return false;
                        }
                    }
                    if (search != null && !search.isBlank()) {
                        String q = search.toLowerCase();
                        boolean matchTitle = p.getTitle() != null && p.getTitle().toLowerCase().contains(q);
                        boolean matchAuthor = p.getAuthor() != null && p.getAuthor().toLowerCase().contains(q);
                        boolean matchDesc = p.getDescription() != null && p.getDescription().toLowerCase().contains(q);
                        if (!matchTitle && !matchAuthor && !matchDesc) return false;
                    }
                    if (language != null && !language.equalsIgnoreCase("all") && !language.isBlank()) {
                        if (p.getLanguage() == null || !p.getLanguage().equalsIgnoreCase(language)) {
                            return false;
                        }
                    }
                    if (format != null && !format.equalsIgnoreCase("all") && !format.isBlank()) {
                        if (p.getFormat() == null || !p.getFormat().equalsIgnoreCase(format)) {
                            return false;
                        }
                    }
                    if (priceEnum != PriceRange.ALL) {
                        double price = p.getPrice() != null ? p.getPrice() : 0.0;
                        if (priceEnum == PriceRange.UNDER_200 && price >= 200) return false;
                        if (priceEnum == PriceRange.BETWEEN_200_400 && (price < 200 || price > 400)) return false;
                        if (priceEnum == PriceRange.ABOVE_400 && price <= 400) return false;
                    }
                    return true;
                })
                .sorted((p1, p2) -> {
                    if (sortEnum == SortBy.PRICE_LOW_HIGH) {
                        return Double.compare(p1.getPrice() != null ? p1.getPrice() : 0,
                                p2.getPrice() != null ? p2.getPrice() : 0);
                    }
                    if (sortEnum == SortBy.PRICE_HIGH_LOW) {
                        return Double.compare(p2.getPrice() != null ? p2.getPrice() : 0,
                                p1.getPrice() != null ? p1.getPrice() : 0);
                    }
                    if (sortEnum == SortBy.RATING) {
                        return Double.compare(p2.getRating() != null ? p2.getRating() : 0,
                                p1.getRating() != null ? p1.getRating() : 0);
                    }
                    return 0;
                })
                .collect(Collectors.toList());

        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        int start = (int) pageRequest.getOffset();
        int end = Math.min(start + pageRequest.getPageSize(), filtered.size());
        List<Product> pageContent = filtered.subList(start, end);
        return new PageImpl<>(pageContent, pageRequest, filtered.size());
    }

    public List<String> getCategories() {
        return productRepository.findAll().stream()
                .filter(p -> p.getCategories() != null)
                .flatMap(p -> p.getCategories().stream())
                .map(String::trim)
                .filter(c -> !c.isEmpty())
                .distinct()
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .collect(Collectors.toList());
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Optional<Product> getProductBySlug(String slug) {
        return productRepository.findBySlug(slug);
    }
}
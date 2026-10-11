package com.example.demo.config;

import com.example.demo.product.model.Product;
import com.example.demo.product.repository.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

@Configuration
public class DataInitializer {

    @Bean
    @Transactional
    public CommandLineRunner initData(
            ProductRepository productRepository,
            ObjectMapper objectMapper
    ) {
        return args -> {

            ClassPathResource resource =
                    new ClassPathResource("data/products.json");

            List<Product> products;
            try (InputStream inputStream = resource.getInputStream()) {
                products = objectMapper.readValue(
                        inputStream,
                        new TypeReference<List<Product>>() {}
                );
            }

            // Idempotent catalog refresh keyed by slug:
            // update existing rows in place, insert brand-new ones.
            // This guarantees the running catalog always reflects the
            // current data/products.json, regardless of prior seed state.
            Map<String, Product> existingBySlug = productRepository.findAll().stream()
                    .collect(Collectors.toMap(Product::getSlug, Function.identity()));

            AtomicInteger inserted = new AtomicInteger(0);
            AtomicInteger updated = new AtomicInteger(0);
            for (Product p : products) {
                Optional.ofNullable(existingBySlug.get(p.getSlug()))
                        .ifPresent(existing -> {
                            copyProductFields(existing, p);
                            productRepository.save(existing);
                            updated.incrementAndGet();
                        });
                if (!existingBySlug.containsKey(p.getSlug())) {
                    p.setId(null);
                    productRepository.save(p);
                    inserted.incrementAndGet();
                }
            }

            System.out.println(
                    "Catalog refreshed: " + inserted.get() + " inserted, " + updated.get() + " updated (" + products.size() + " total)."
            );
        };
    }

    private void copyProductFields(Product target, Product source) {
        target.setSlug(source.getSlug());
        target.setTitle(source.getTitle());
        target.setAuthor(source.getAuthor());
        target.setAuthorBio(source.getAuthorBio());
        target.setDescription(source.getDescription());
        target.setPublisher(source.getPublisher());
        target.setPrice(source.getPrice());
        target.setOriginalPrice(source.getOriginalPrice());
        target.setFormat(source.getFormat());
        target.setCategories(source.getCategories());
        target.setDeliveryEstimate(source.getDeliveryEstimate());
        target.setRating(source.getRating());
        target.setSalesCount(source.getSalesCount());
        target.setLanguage(source.getLanguage());
        target.setCoverImage(source.getCoverImage());
    }
}
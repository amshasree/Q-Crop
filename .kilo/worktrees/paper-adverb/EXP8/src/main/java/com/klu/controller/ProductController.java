package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klu.model.Product;
import com.klu.repository.ProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository repo;

    // Insert product
    @PostMapping("/add")
    public Product addProduct(@RequestBody Product p) {
        return repo.save(p);
    }

    // Get all products
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // Category search
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return repo.findByCategory(category);
    }

    // Price range filter
    @GetMapping("/filter")
    public List<Product> filterByPrice(@RequestParam double min,
                                       @RequestParam double max) {
        return repo.findByPriceBetween(min, max);
    }

    // Sorted by price
    @GetMapping("/sorted")
    public List<Product> sortProducts() {
        return repo.sortByPrice();
    }

    // Expensive products
    @GetMapping("/expensive/{price}")
    public List<Product> expensiveProducts(@PathVariable double price) {
        return repo.findExpensiveProducts(price);
    }
}
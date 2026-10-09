package com.klu.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.klu.model.Book;

@RestController
public class LibraryController {

    List<Book> bookList = new ArrayList<>();

    // Welcome message
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Online Library System";
    }

    // Count of books
    @GetMapping("/count")
    public int count() {
        return 200;
    }

    // Sample price
    @GetMapping("/price")
    public double price() {
        return 399.99;
    }

    // List of book titles
    @GetMapping("/books")
    public List<String> books() {

        List<String> list = new ArrayList<>();

        list.add("Java Programming");
        list.add("Spring Boot Guide");
        list.add("Database Systems");

        return list;
    }

    // Book details by id
    @GetMapping("/books/{id}")
    public String getBook(@PathVariable int id) {
        return "Details of Book with ID: " + id;
    }

    // Search book using request parameter
    @GetMapping("/search")
    public String search(@RequestParam String title) {
        return "Searching book with title: " + title;
    }

    // Author path variable
    @GetMapping("/author/{name}")
    public String author(@PathVariable String name) {
        return "Books written by author: " + name;
    }

    // Add book
    @PostMapping("/addbook")
    public String addBook(@RequestBody Book book) {

        bookList.add(book);

        return "Book added successfully";
    }

    // View all books
    @GetMapping("/viewbooks")
    public List<Book> viewBooks() {

        return bookList;
    }

}
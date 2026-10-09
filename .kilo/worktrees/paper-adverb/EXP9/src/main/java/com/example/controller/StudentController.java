package com.example.controller;

import org.springframework.web.bind.annotation.*;

import com.example.exception.InvalidInputException;
import com.example.exception.StudentNotFoundException;
import com.example.model.Student;

@RestController
@RequestMapping("/student")
public class StudentController {

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id) {

        if(id <= 0) {
            throw new InvalidInputException("Student ID must be greater than 0");
        }

        if(id != 1) {
            throw new StudentNotFoundException("Student with ID " + id + " not found");
        }

        return new Student(1, "Deepika", "Computer Science");
    }
}
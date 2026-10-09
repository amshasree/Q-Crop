package com.klu.controller;

import com.klu.model.Course;
import com.klu.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService service;

    // CREATE
    @PostMapping
    public ResponseEntity<?> addCourse(@RequestBody Course course) {

        if (course.getTitle() == null || course.getTitle().isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Course title cannot be empty");
        }

        service.addCourse(course);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Course added successfully");
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(service.getAllCourses());
    }

    // READ BY ID (FIXED TYPE ISSUE)
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable int id) {

        return service.getCourseById(id)
                .<ResponseEntity<?>>map(course ->
                        ResponseEntity.ok(course))
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("Course not found"));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable int id,
                                          @RequestBody Course course) {

        return service.updateCourse(id, course)
                .<ResponseEntity<?>>map(updated ->
                        ResponseEntity.ok("Course updated successfully"))
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("Course not found"));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id) {

        if (service.deleteCourse(id)) {
            return ResponseEntity.ok("Course deleted successfully");
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Course not found");
        }
    }

    // SEARCH
    @GetMapping("/search/{title}")
    public ResponseEntity<List<Course>> searchCourse(@PathVariable String title) {
        return ResponseEntity.ok(service.searchByTitle(title));
    }
}
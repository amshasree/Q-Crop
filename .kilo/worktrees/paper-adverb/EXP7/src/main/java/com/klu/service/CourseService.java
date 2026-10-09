package com.klu.service;

import com.klu.model.Course;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private List<Course> courseList = new ArrayList<>();

    // CREATE
    public Course addCourse(Course course) {
        courseList.add(course);
        return course;
    }

    // READ ALL
    public List<Course> getAllCourses() {
        return courseList;
    }

    // READ BY ID
    public Optional<Course> getCourseById(int id) {
        return courseList.stream()
                .filter(c -> c.getCourseId() == id)
                .findFirst();
    }

    // UPDATE
    public Optional<Course> updateCourse(int id, Course updatedCourse) {
        Optional<Course> existing = getCourseById(id);

        existing.ifPresent(course -> {
            course.setTitle(updatedCourse.getTitle());
            course.setDuration(updatedCourse.getDuration());
            course.setFee(updatedCourse.getFee());
        });

        return existing;
    }

    // DELETE
    public boolean deleteCourse(int id) {
        return courseList.removeIf(c -> c.getCourseId() == id);
    }

    // SEARCH
    public List<Course> searchByTitle(String title) {
        return courseList.stream()
                .filter(c -> c.getTitle().equalsIgnoreCase(title))
                .toList();
    }
}
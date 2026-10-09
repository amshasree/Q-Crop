package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Student {

    private int id = 1;
    private String name = "Karthika";
    private String gender = "Female";

    @Autowired
    private Certification certification;

    public void display() {

        System.out.println("Student ID: " + id);
        System.out.println("Student Name: " + name);
        System.out.println("Gender: " + gender);

        System.out.println("Certification ID: " + certification.getId());
        System.out.println("Certification Name: " + certification.getName());
        System.out.println("Completion Date: " + certification.getDateOfCompletion());
    }
}
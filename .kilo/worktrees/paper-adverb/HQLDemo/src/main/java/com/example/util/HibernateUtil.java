package com.example.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.example.entity.Product;

public class HibernateUtil {

    private static SessionFactory factory;

    static {
        try {

            factory = new Configuration()
                    .configure("hibernate.cfg.xml")
                    .addAnnotatedClass(Product.class)
                    .buildSessionFactory();

        } catch (Exception e) {
            System.out.println("SessionFactory creation failed");
            e.printStackTrace();
        }
    }

    public static SessionFactory getSessionFactory() {
        return factory;
    }
}
package com.example.HQLDemo;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.example.entity.Product;
import com.example.util.HibernateUtil;

public class App {

    public static void main(String[] args) {

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        /* --------------------------------
           1. Sort Products by Price (ASC)
        -------------------------------- */
        Query<Product> q1 = session.createQuery(
                "FROM Product ORDER BY price ASC", Product.class);

        List<Product> list1 = q1.list();
        System.out.println("Products Sorted by Price ASC:");
        list1.forEach(p ->
                System.out.println(p.getName() + " - " + p.getPrice()));

        /* --------------------------------
           2. Sort Products by Price (DESC)
        -------------------------------- */
        Query<Product> q2 = session.createQuery(
                "FROM Product ORDER BY price DESC", Product.class);

        List<Product> list2 = q2.list();
        System.out.println("\nProducts Sorted by Price DESC:");
        list2.forEach(p ->
                System.out.println(p.getName() + " - " + p.getPrice()));

        /* --------------------------------
           3. Sort by Quantity (Highest)
        -------------------------------- */
        Query<Product> q3 = session.createQuery(
                "FROM Product ORDER BY quantity DESC", Product.class);

        List<Product> list3 = q3.list();
        System.out.println("\nProducts Sorted by Quantity:");
        list3.forEach(p ->
                System.out.println(p.getName() + " - " + p.getQuantity()));

        /* --------------------------------
           4. Pagination - First 3 Products
        -------------------------------- */
        Query<Product> q4 = session.createQuery(
                "FROM Product", Product.class);

        q4.setFirstResult(0);
        q4.setMaxResults(3);

        List<Product> page1 = q4.list();
        System.out.println("\nFirst 3 Products:");
        page1.forEach(p -> System.out.println(p.getName()));

        /* --------------------------------
           5. Pagination - Next 3 Products
        -------------------------------- */
        Query<Product> q5 = session.createQuery(
                "FROM Product", Product.class);

        q5.setFirstResult(3);
        q5.setMaxResults(3);

        List<Product> page2 = q5.list();
        System.out.println("\nNext 3 Products:");
        page2.forEach(p -> System.out.println(p.getName()));

        /* --------------------------------
           6. Count Total Products
        -------------------------------- */
        Query<Long> q6 = session.createQuery(
                "SELECT count(p.id) FROM Product p", Long.class);

        Long total = q6.uniqueResult();
        System.out.println("\nTotal Products: " + total);

        /* --------------------------------
           7. Count Products where quantity > 0
        -------------------------------- */
        Query<Long> q7 = session.createQuery(
                "SELECT count(p.id) FROM Product p WHERE p.quantity > 0",
                Long.class);

        Long available = q7.uniqueResult();
        System.out.println("Products with Quantity > 0: " + available);

        /* --------------------------------
           8. Min and Max Price
        -------------------------------- */
        Query<Object[]> q8 = session.createQuery(
                "SELECT min(price), max(price) FROM Product",
                Object[].class);

        Object[] prices = q8.uniqueResult();
        System.out.println("\nMinimum Price: " + prices[0]);
        System.out.println("Maximum Price: " + prices[1]);

        /* --------------------------------
           9. GROUP BY Description
        -------------------------------- */
        Query<Object[]> q9 = session.createQuery(
                "SELECT description, count(*) FROM Product GROUP BY description",
                Object[].class);

        List<Object[]> groupList = q9.list();
        System.out.println("\nProducts Grouped by Description:");
        for(Object[] row : groupList) {
            System.out.println(row[0] + " : " + row[1]);
        }

        /* --------------------------------
           10. Price Range Filter
        -------------------------------- */
        Query<Product> q10 = session.createQuery(
                "FROM Product WHERE price BETWEEN :min AND :max",
                Product.class);

        q10.setParameter("min", 1000);
        q10.setParameter("max", 10000);

        List<Product> rangeList = q10.list();
        System.out.println("\nProducts Between Price 1000 and 10000:");
        rangeList.forEach(p ->
                System.out.println(p.getName() + " - " + p.getPrice()));

        /* --------------------------------
           11. LIKE Queries
        -------------------------------- */

        Query<Product> q11 = session.createQuery(
                "FROM Product WHERE name LIKE 'L%'", Product.class);

        System.out.println("\nNames Starting with L:");
        q11.list().forEach(p -> System.out.println(p.getName()));

        Query<Product> q12 = session.createQuery(
                "FROM Product WHERE name LIKE '%p'", Product.class);

        System.out.println("\nNames Ending with p:");
        q12.list().forEach(p -> System.out.println(p.getName()));

        Query<Product> q13 = session.createQuery(
                "FROM Product WHERE name LIKE '%top%'", Product.class);

        System.out.println("\nNames Containing 'top':");
        q13.list().forEach(p -> System.out.println(p.getName()));

        tx.commit();
        session.close();
        HibernateUtil.getSessionFactory().close();
    }
}
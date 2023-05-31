package com.example.todolist.repository;

import com.example.todolist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    List<User> findAll();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO users (id, email, enabled, username, password)" +
            " VALUES (:id, :email, :enabled, :login, :encodedPassword)",
            nativeQuery = true)
    void addUser(@Param("id") UUID id, @Param("email") String email,
                 @Param("enabled") boolean enabled, @Param("login") String login,
                 @Param("encodedPassword") String encodedPassword);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user_roles (id, name, user_id) VALUES (:id, :name, :user_id)", nativeQuery = true)
    void addUserRole(@Param("id") UUID id, @Param("name") String name, @Param("user_id") UUID user_id);
}


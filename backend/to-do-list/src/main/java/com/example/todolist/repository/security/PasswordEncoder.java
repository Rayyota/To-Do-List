package com.example.todolist.repository.security;

public interface PasswordEncoder {
    boolean matches(String plainPassword, String hashedPassword);

    String encode(String password);
}


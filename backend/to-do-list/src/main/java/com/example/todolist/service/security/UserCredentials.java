package com.example.todolist.service.security;

import java.util.Set;
import java.util.UUID;

public interface UserCredentials {

    UUID getUserId();

    String getUsername();

    Set<String> getRoles();

}



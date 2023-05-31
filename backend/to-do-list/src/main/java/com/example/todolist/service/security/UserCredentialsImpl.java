package com.example.todolist.service.security;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.*;

class UserCredentialsImpl implements UserCredentials {

    @JsonProperty("userId")
    private UUID userId;

    @JsonProperty("username")
    private final String username;

    @JsonProperty("roles")
    private final Set<String> roles;

    @JsonCreator
    public UserCredentialsImpl(String username, Collection<String> roles,
                               UUID userId) {
        this.userId = userId;
        this.username = username;
        this.roles = Collections.unmodifiableSet(new LinkedHashSet<>(roles));
    }

    public String getUsername() {
        return username;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public UUID getUserId() {
        return userId;
    }
}



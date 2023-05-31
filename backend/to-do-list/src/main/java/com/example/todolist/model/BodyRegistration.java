package com.example.todolist.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class BodyRegistration {
    private final String email;
    private final String login;
    private final String password;

    @JsonCreator
    public BodyRegistration(@JsonProperty("email") String email, @JsonProperty("login") String login, @JsonProperty("password") String password) {
        this.email = email;
        this.login = login;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }
}

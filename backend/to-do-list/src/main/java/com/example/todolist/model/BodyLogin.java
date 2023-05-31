package com.example.todolist.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class BodyLogin {
    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;

    @JsonCreator
    public BodyLogin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}


package com.example.todolist.service.security;

import com.example.todolist.model.User;

public interface JwtTokenService {

    UserCredentials parseToken(String token);

    String createToken(User user);

}

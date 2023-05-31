package com.example.todolist.config;

import com.example.todolist.controller.SignUpController;
import com.example.todolist.service.UserService;
import com.example.todolist.service.security.JwtTokenService;
import com.example.todolist.service.signUp.SignUpService;
import org.springframework.context.annotation.Bean;

public class SignUpConfig {

    @Bean
    public Object signUpController(final SignUpService signUpService, final JwtTokenService jwtTokenService,
                                   final UserService userService) {
        return new SignUpController(signUpService, jwtTokenService, userService);
    }

}



package com.example.todolist.config;

import com.example.todolist.controller.SignInController;
import com.example.todolist.service.security.JwtTokenService;
import com.example.todolist.service.signIn.SignInService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoginConfig {

    @Bean
    public Object loginController(final SignInService signInService, final JwtTokenService jwtTokenService) {
        return new SignInController(signInService, jwtTokenService);
    }

}

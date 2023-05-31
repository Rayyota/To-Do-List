package com.example.todolist.controller;

import com.example.todolist.model.BodyLogin;
import com.example.todolist.model.Token;
import com.example.todolist.model.User;
import com.example.todolist.service.security.JwtTokenService;
import com.example.todolist.service.signIn.SignInService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/login")
public class SignInController {

    private final SignInService signInService;
    private final JwtTokenService tokenService;

    public SignInController(final SignInService signInService, final JwtTokenService tokenService) {
        this.signInService = signInService;
        this.tokenService = tokenService;
    }

    @PostMapping
    @ResponseBody
    public Token create(@RequestBody BodyLogin bodyLogin) {
        User user = signInService.login(bodyLogin);
        String token = tokenService.createToken(user);
        return new Token(token);
    }

}


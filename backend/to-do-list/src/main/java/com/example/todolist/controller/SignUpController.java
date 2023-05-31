package com.example.todolist.controller;


import com.example.todolist.model.BodyRegistration;
import com.example.todolist.model.Token;
import com.example.todolist.model.User;
import com.example.todolist.service.UserService;
import com.example.todolist.service.security.JwtTokenService;
import com.example.todolist.service.signUp.SignUpService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@Controller
@RequestMapping("/signup")
public class SignUpController {
    private final SignUpService signUpService;
    private final JwtTokenService tokenService;
    private final UserService userService;

    public SignUpController(final SignUpService signUpService,
                            final JwtTokenService tokenService, UserService userService) {
        this.signUpService = signUpService;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @PostMapping
    @ResponseBody
    public Token signUp(@RequestBody BodyRegistration bodyRegistration) {
        signUpService.signUp(bodyRegistration);
        User user = userService.findByUsername(bodyRegistration.getLogin());
        String token = tokenService.createToken(user);
        return new Token(token);
    }
}


package com.example.todolist.service.signIn;

import com.example.todolist.exception.LoginFailedException;
import com.example.todolist.model.BodyLogin;
import com.example.todolist.model.User;
import com.example.todolist.repository.UserRepository;
import com.example.todolist.repository.security.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignInService {

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public SignInService(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    public User login(BodyLogin bodyLogin) {
        User user = users.findByUsername(bodyLogin.getEmail());

        if (user == null) {
            throw new LoginFailedException("User '" + bodyLogin.getEmail() + "' not found");
        }

        if (!passwordEncoder.matches(bodyLogin.getPassword(), user.getPassword())) {
            throw new LoginFailedException("Wrong password");
        }
        return user;
    }

}


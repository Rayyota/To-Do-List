package com.example.todolist.service.signUp;

import com.example.todolist.exception.SignUpFailedException;
import com.example.todolist.model.BodyRegistration;
import com.example.todolist.model.User;
import com.example.todolist.repository.UserRepository;
import com.example.todolist.repository.security.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SignUpService {
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    public SignUpService(UserRepository users, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
    }

    public void signUp(BodyRegistration bodyRegistration) {
        User user = users.findByUsername(bodyRegistration.getLogin());

        if (user != null) {
            throw new SignUpFailedException("This user already exists");
        }

        UUID id = UUID.randomUUID();

        String encodedPassword = passwordEncoder.encode(bodyRegistration.getPassword());

        users.addUser(id, bodyRegistration.getEmail(), true,
                bodyRegistration.getLogin(), encodedPassword);
        users.addUserRole(UUID.randomUUID(), "USER", id);
    }
}


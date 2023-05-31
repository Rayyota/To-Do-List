package com.example.todolist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class SignUpFailedException extends RuntimeException {

    public SignUpFailedException(String message, Throwable cause) {
        super(message, cause);
    }

    public SignUpFailedException(String message) {
        super(message);
    }
}


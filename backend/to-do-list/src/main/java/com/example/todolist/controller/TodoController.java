package com.example.todolist.controller;

import com.example.todolist.model.Todo;
import com.example.todolist.model.TodoRequest;
import com.example.todolist.model.TodoResponse;
import com.example.todolist.service.TodoService;
import com.example.todolist.service.security.AuthRoleRequired;
import com.example.todolist.service.security.UserCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("")
    @AuthRoleRequired("USER")
    public ResponseEntity<Void> createTask(@RequestBody TodoRequest todoRequest,
                                           final UserCredentials userCredentials) {
        try {
            todoService.createTodo(todoRequest, userCredentials.getUserId());

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    @AuthRoleRequired("USER")
    public ResponseEntity<List<TodoResponse>> getAllTasks(final UserCredentials userCredentials) {
        try {
            List<Todo> todos = todoService.getTodosByUserId(userCredentials.getUserId());
            List<TodoResponse> todoResponses = new ArrayList<>();

            for (Todo todo : todos) {
                TodoResponse todoResponse = new TodoResponse(todo.getId(),
                        todo.getTitle(),
                        todo.getDescription(),
                        todo.getStatus(),
                        todo.getPriority(),
                        todo.getCreatedAt(),
                        todo.getUpdatedAt(),
                        todo.getDeadline());
                todoResponses.add(todoResponse);
            }

            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(todoResponses);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{taskId}")
    @AuthRoleRequired("USER")
    public ResponseEntity<?> deleteTask(@PathVariable String taskId, final UserCredentials userCredentials) {
        try {

            UUID todoId = UUID.fromString(taskId);
            Todo todo = todoService.getTodoById(todoId);

            if (todo != null && todo.getCreatedBy().getId().equals(userCredentials.getUserId())) {
                todoService.deleteTodoById(todoId);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{taskId}")
    @AuthRoleRequired("USER")
    public ResponseEntity<?> updateTask(@PathVariable String taskId,
                                        @RequestBody TodoRequest todoRequest,
                                        final UserCredentials userCredentials) {
        try {
            UUID todoId = UUID.fromString(taskId);
            Todo todo = todoService.getTodoById(todoId);

            if (todo != null && todo.getCreatedBy().getId().equals(userCredentials.getUserId())) {
                if (todoRequest.getTitle() != null) {
                    todo.setTitle(todoRequest.getTitle());
                }
                if (todoRequest.getDescription() != null) {
                    todo.setDescription(todoRequest.getDescription());
                }
                if (todoRequest.getStatus() != null) {
                    todo.setStatus(todoRequest.getStatus());
                }
                if (todoRequest.getPriority() != 0) {
                    todo.setPriority(todoRequest.getPriority());
                }
                todo.setUpdatedAt(LocalDate.now());

                todoService.updateTodo(todo);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{taskId}")
    @AuthRoleRequired("USER")
    public ResponseEntity<?> completeTask(@PathVariable String taskId, final UserCredentials userCredentials) {
        try {
            UUID todoId = UUID.fromString(taskId);
            Todo todo = todoService.getTodoById(todoId);

            if (todo != null && todo.getCreatedBy().getId().equals(userCredentials.getUserId())) {
                todo.setStatus("Completed");
                todo.setUpdatedAt(LocalDate.now());

                todoService.updateTodo(todo);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}

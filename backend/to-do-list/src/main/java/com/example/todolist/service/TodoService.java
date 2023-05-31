package com.example.todolist.service;

import com.example.todolist.exception.ResourceNotFoundException;
import com.example.todolist.model.Todo;
import com.example.todolist.model.TodoRequest;
import com.example.todolist.model.User;
import com.example.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class TodoService {

    private TodoRepository todoRepository;

    @Autowired
    public void setTodoRepository(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public void createTodo(TodoRequest todoRequest, UUID userId) {
        Todo todo = new Todo();
        todo.setId(UUID.randomUUID());
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setPriority(todoRequest.getPriority());
        todo.setDeadline(todoRequest.getDeadline());
        todo.setCreatedBy(new User(userId));
        todo.setCreatedAt(LocalDate.now());
        todo.setStatus("New");
        todoRepository.save(todo);
    }

    public Todo getTodoById(UUID todoId) {
        return todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo", "id", todoId));
    }

    public void deleteTodo(UUID todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo", "id", todoId));
        todoRepository.delete(todo);
    }

    public List<Todo> getTodosByUser(User user) {
        return todoRepository.findByCreatedBy(user);
    }

    public List<Todo> getTodosByUserId(UUID userId) {
        return todoRepository.findByCreatedById(userId);
    }

    public boolean existsTodoByIdAndUserId(UUID taskId, UUID userId) {
        Todo todo = todoRepository.findByIdAndAndCreatedBy(taskId, userId);
        return todo != null;
    }

    public void deleteTodoById(UUID taskId) {
        todoRepository.deleteById(taskId);
    }

    public void updateTodo(Todo todo) {
        todoRepository.save(todo);
    }
}

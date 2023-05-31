package com.example.todolist.repository;

import com.example.todolist.model.Todo;
import com.example.todolist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TodoRepository extends JpaRepository<Todo, UUID> {
    List<Todo> findByCreatedBy(User user);

    default List<Todo> findByCreatedById(UUID userId) {
        User user = new User();
        user.setId(userId);
        return findByCreatedBy(user);
    }

    Todo findByIdAndAndCreatedBy(UUID taskId, UUID userId);

    void deleteById(UUID taskId);
}

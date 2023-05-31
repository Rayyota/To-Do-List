package com.example.todolist.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.UUID;

public class TodoResponse {
    private final UUID id;
    private final String title;
    private final String description;
    private final String status;
    private final short priority;
    private final LocalDate createdAt;
    private final LocalDate updatedAt;
    private final LocalDate deadline;

    @JsonCreator
    public TodoResponse(@JsonProperty("id") UUID id,
                        @JsonProperty("title") String title,
                        @JsonProperty("description") String description,
                        @JsonProperty("status") String status,
                        @JsonProperty("priority") short priority,
                        @JsonProperty("createdAt") LocalDate createdAt,
                        @JsonProperty("updatedAt") LocalDate updatedAt,
                        @JsonProperty("deadline") LocalDate deadline) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deadline = deadline;
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public short getPriority() {
        return priority;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public LocalDate getDeadline() {
        return deadline;
    }
}

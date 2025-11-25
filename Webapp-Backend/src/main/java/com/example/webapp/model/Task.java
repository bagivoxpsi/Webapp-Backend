package com.example.webapp.model;

public class Task {
    private int id;
    private String title;
    private String description;
    private String taskType;  // Changed from 'priority' to match SQL
    private String dueDate;
    private String priority;
    private String status;    // Added new field
    private boolean completed;
    
    public Task() {}
    
    public Task(int id, String title, String description, String taskType, String dueDate, String priority, String status, boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.taskType = taskType;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.completed = completed;
    }
    
    // Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getTaskType() { return taskType; }
    public void setTaskType(String taskType) { this.taskType = taskType; }
    
    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
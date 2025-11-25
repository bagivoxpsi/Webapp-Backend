package com.example.webapp.servlet;

import com.example.webapp.model.Task;
import com.example.webapp.util.DBConnection;
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.sql.*;
import java.util.*;

@WebServlet("/api/tasks/upcoming")
public class TasksServlet extends HttpServlet {
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        int userId = 1; // In real app, get from session
        
        try (Connection conn = DBConnection.getConnection()) {
            List<Task> tasks = getUpcomingTasks(conn, userId);
            String jsonResponse = convertTasksToJson(tasks);
            
            PrintWriter out = response.getWriter();
            out.print(jsonResponse);
            out.flush();
            
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendError(500, "Database error");
        }
    }
    
    private List<Task> getUpcomingTasks(Connection conn, int userId) throws SQLException {
        List<Task> tasks = new ArrayList<>();
        String sql = "SELECT id, title, description, task_type, due_date, priority, status, completed " +
                    "FROM tasks WHERE user_id = ? AND completed = FALSE ORDER BY due_date ASC LIMIT 10";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                Task task = new Task();
                task.setId(rs.getInt("id"));
                task.setTitle(rs.getString("title"));
                task.setDescription(rs.getString("description"));
                task.setTaskType(rs.getString("task_type"));
                task.setDueDate(rs.getString("due_date"));
                task.setPriority(rs.getString("priority"));
                task.setStatus(rs.getString("status"));
                task.setCompleted(rs.getBoolean("completed"));
                tasks.add(task);
            }
        }
        return tasks;
    }
    
    private String convertTasksToJson(List<Task> tasks) {
        StringBuilder json = new StringBuilder();
        json.append("{\"tasks\":[");
        
        boolean firstTask = true;
        for (Task task : tasks) {
            if (!firstTask) json.append(",");
            
            json.append("{");
            json.append("\"id\":").append(task.getId()).append(",");
            json.append("\"title\":\"").append(escapeJson(task.getTitle())).append("\",");
            json.append("\"description\":\"").append(escapeJson(task.getDescription())).append("\",");
            json.append("\"taskType\":\"").append(task.getTaskType()).append("\",");
            json.append("\"dueDate\":\"").append(task.getDueDate()).append("\",");
            json.append("\"priority\":\"").append(task.getPriority()).append("\",");
            json.append("\"status\":\"").append(task.getStatus()).append("\",");
            json.append("\"completed\":").append(task.isCompleted());
            json.append("}");
            
            firstTask = false;
        }
        
        json.append("]}");
        return json.toString();
    }
    
    private String escapeJson(String text) {
        return text.replace("\"", "\\\"").replace("\n", "\\n");
    }
}
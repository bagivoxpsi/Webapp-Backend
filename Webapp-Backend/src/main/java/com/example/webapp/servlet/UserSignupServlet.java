package com.example.webapp.servlet;

import com.example.webapp.model.User;
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.util.Random;

@WebServlet("/api/user/signup")
public class UserSignupServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        // Get form data
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        // Generate random user ID and creation date
        Random random = new Random();
        int userId = random.nextInt(1000) + 1;
        String createdAt = java.time.LocalDate.now().toString();
        
        // Create user object
        User user = new User(userId, username, email, createdAt);
        
        // Return user data with success message
        String jsonResponse = String.format(
            "{\"success\":true, \"message\":\"User created successfully\", \"user\":{\"id\":%d, \"username\":\"%s\", \"email\":\"%s\", \"createdAt\":\"%s\"}}",
            user.getId(), user.getUsername(), user.getEmail(), user.getCreatedAt()
        );
        
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
        
        
        
    }
}
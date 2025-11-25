package com.webapp.servlet;

import com.webapp.util.DatabaseConnection;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.*;
import java.sql.*;

@WebServlet("/update-username")
public class UpdateUsernameServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String currentUsername = (String) request.getSession().getAttribute("username");
        String newUsername = request.getParameter("newUsername");
        
        if (currentUsername == null || newUsername == null || newUsername.trim().isEmpty()) {
            response.sendRedirect("profile.jsp?error=Invalid username");
            return;
        }
        
        Connection conn = null;
        PreparedStatement stmt = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            
            // Check if new username already exists
            String checkSql = "SELECT id FROM users WHERE username = ?";
            stmt = conn.prepareStatement(checkSql);
            stmt.setString(1, newUsername);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                response.sendRedirect("profile.jsp?error=Username already exists");
                return;
            }
            
            // Update username
            String updateSql = "UPDATE users SET username = ? WHERE username = ?";
            stmt = conn.prepareStatement(updateSql);
            stmt.setString(1, newUsername);
            stmt.setString(2, currentUsername);
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                // Update session with new username
                request.getSession().setAttribute("username", newUsername);
                response.sendRedirect("profile.jsp?success=Username updated successfully");
            } else {
                response.sendRedirect("profile.jsp?error=Failed to update username");
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect("profile.jsp?error=Database error");
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
package com.webapp.servlet;

import com.webapp.util.DatabaseConnection;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.io.*;
import java.sql.*;

@WebServlet("/update-profile-picture")
public class UpdateProfilePictureServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = (String) request.getSession().getAttribute("username");
        String imagePath = request.getParameter("imagePath");
        
        if (username == null || imagePath == null) {
            response.sendRedirect("profile.jsp?error=Invalid image data");
            return;
        }
        
        Connection conn = null;
        PreparedStatement stmt = null;
        
        try {
            conn = DatabaseConnection.getConnection();
            
            String sql = "UPDATE users SET profile_image = ? WHERE username = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, imagePath);
            stmt.setString(2, username);
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                response.sendRedirect("profile.jsp?success=Profile picture updated");
            } else {
                response.sendRedirect("profile.jsp?error=Failed to update profile picture");
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
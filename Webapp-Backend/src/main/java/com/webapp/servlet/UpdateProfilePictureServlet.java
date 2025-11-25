package com.webapp.servlet;

import com.webapp.util.DatabaseConnection;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.*;
import java.nio.file.Paths;
import java.sql.*;

@WebServlet("/update-profile-picture")
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024, // 1 MB
    maxFileSize = 1024 * 1024 * 5,    // 5 MB
    maxRequestSize = 1024 * 1024 * 10 // 10 MB
)
public class UpdateProfilePictureServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "uploads"; // Relative to webapp root

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = (String) request.getSession().getAttribute("username");
        if (username == null) {
            response.sendRedirect("profile.html?error=Not logged in");
            return;
        }

        // Get the uploaded file
        Part filePart = request.getPart("imageFile");
        if (filePart == null || filePart.getSize() == 0) {
            response.sendRedirect("profile.html?error=No file uploaded");
            return;
        }

        // Validate file type (e.g., only images)
        String contentType = filePart.getContentType();
        if (!contentType.startsWith("image/")) {
            response.sendRedirect("profile.html?error=Invalid file type. Only images allowed.");
            return;
        }

        // Generate unique filename to avoid conflicts
        String fileName = username + "_" + System.currentTimeMillis() + "_" + Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
        String uploadPath = getServletContext().getRealPath("") + File.separator + UPLOAD_DIR;
        
        // Create upload directory if it doesn't exist
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        // Save the file
        String filePath = uploadPath + File.separator + fileName;
        filePart.write(filePath);

        // DB path (relative URL for web access)
        String imagePath = "/" + UPLOAD_DIR + "/" + fileName;

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
                response.sendRedirect("profile.html?success=Profile picture updated");
            } else {
                response.sendRedirect("profile.html?error=Failed to update profile picture");
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect("profile.html?error=Database error");
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
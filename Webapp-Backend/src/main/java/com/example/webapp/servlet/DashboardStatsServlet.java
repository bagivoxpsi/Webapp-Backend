package com.example.webapp.servlet;

import com.example.webapp.model.DashboardStats;
import com.example.webapp.util.DBConnection;
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.sql.*;
import java.util.*;

@WebServlet("/api/dashboard/stats")
public class DashboardStatsServlet extends HttpServlet {
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        int userId = 1; // In real app, get from session
        
        try (Connection conn = DBConnection.getConnection()) {
            DashboardStats stats = getDashboardStats(conn, userId);
            String jsonResponse = convertStatsToJson(stats);
            
            PrintWriter out = response.getWriter();
            out.print(jsonResponse);
            out.flush();
            
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendError(500, "Database error");
        }
    }
    
    private DashboardStats getDashboardStats(Connection conn, int userId) throws SQLException {
        String sql = "SELECT total_devices, online_devices, energy_consumption, " +
                    "security_events, temperature_avg, daily_savings " +
                    "FROM dashboard_stats WHERE user_id = ? ORDER BY stat_date DESC LIMIT 1";
        
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                DashboardStats stats = new DashboardStats();
                stats.setTotalDevices(rs.getInt("total_devices"));
                stats.setOnlineDevices(rs.getInt("online_devices"));
                stats.setEnergyConsumption(rs.getDouble("energy_consumption"));
                stats.setSecurityEvents(rs.getInt("security_events"));
                stats.setTemperatureAvg(rs.getDouble("temperature_avg"));
                stats.setDailySavings(rs.getDouble("daily_savings"));
                return stats;
            }
        }
        return new DashboardStats(); // Return empty stats if none found
    }
    
    private String convertStatsToJson(DashboardStats stats) {
        return String.format(
            "{\"totalDevices\":%d, \"onlineDevices\":%d, \"energyConsumption\":%.2f, " +
            "\"securityEvents\":%d, \"temperatureAvg\":%.1f, \"dailySavings\":%.2f}",
            stats.getTotalDevices(), stats.getOnlineDevices(), stats.getEnergyConsumption(),
            stats.getSecurityEvents(), stats.getTemperatureAvg(), stats.getDailySavings()
        );
    }
    
    
}
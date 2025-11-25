package com.example.webapp.model;

public class DashboardStats {
    private int totalDevices;
    private int onlineDevices;
    private double energyConsumption;
    private int securityEvents;
    private double temperatureAvg;
    private double dailySavings;
    
    // Add getters and setters for the new fields
    public int getTotalDevices() { return totalDevices; }
    public void setTotalDevices(int totalDevices) { this.totalDevices = totalDevices; }
    
    public int getOnlineDevices() { return onlineDevices; }
    public void setOnlineDevices(int onlineDevices) { this.onlineDevices = onlineDevices; }
    
    public double getEnergyConsumption() { return energyConsumption; }
    public void setEnergyConsumption(double energyConsumption) { this.energyConsumption = energyConsumption; }
    
    public int getSecurityEvents() { return securityEvents; }
    public void setSecurityEvents(int securityEvents) { this.securityEvents = securityEvents; }
    
    public double getTemperatureAvg() { return temperatureAvg; }
    public void setTemperatureAvg(double temperatureAvg) { this.temperatureAvg = temperatureAvg; }
    
    public double getDailySavings() { return dailySavings; }
    public void setDailySavings(double dailySavings) { this.dailySavings = dailySavings; }
}
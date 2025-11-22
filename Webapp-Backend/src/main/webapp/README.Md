Smart Home Management App - README

Group Members & Contributions

    Abdulrahman - Dashboard
    
        Designed and implemented the main dashboard interface
        Created energy consumption charts using Chart.js
        Implemented real-time device status monitoring
        Added interactive quick action buttons

    Baraa - Tasks & Home
        Tasks Page:

        Built task scheduling interface with popup modal
        Implemented device selection and property configuration
        Created task list management system

        Home Page:

        Developed carousel for extension promotions
        Implemented upcoming tasks display
        Added power control functionality
    
    Saif - Settings, Authentication & Theming

        Settings Page:
        Designed comprehensive settings interface
        Implemented account management sections
        Added notification toggle switches
        Created privacy and information sections

        Authentication System:

        Built login and signup pages
        Implemented user registration functionality
        Created secure login system

        Dark Mode:

        Implemented theme switching functionality
        Added consistent dark/light mode across all pages
        Created data persistence using local storage

    Saeed - Profile
        Built user profile interface with editable username
        Implemented saved addresses section
        Added account switching functionality
        Created logout confirmation system
        Integrated profile picture display

Main Application Entry Point
First Page: home.html

Page Descriptions
Home Page (home.html)

Purpose: Main landing page showcasing featured extensions and upcoming tasks
Features:

    Promotional carousel for app extensions
    Display of upcoming scheduled tasks
    Quick power control button
    Navigation to all major sections

Dashboard (dashboard.html)

Purpose: Central hub for monitoring home status and quick controls
Features:

    Energy consumption statistics and charts
    Device status overview
    Recent activity feed
    Quick action buttons for common tasks
    Real-time updates

Tasks (tasks.html)
Purpose: Manage and schedule automated home tasks
Features:

    View existing scheduled tasks
    Add new tasks with device-specific properties
    Configure task timing and device settings
    Modal-based task creation interface

Profile (profile.html)

Purpose: User account management and personalization
Features:

    Editable user profile information
    Saved addresses management
    Account switching functionality
    Secure logout process

Settings (settings.html)

Purpose: Application configuration and preferences
Features:

    Account settings (profile, email/password)
    Notification preferences
    Privacy and security settings
    App information and contact details
    Dark/light theme toggle

Authentication (account/login.html, account/signup.html)

Purpose: User authentication and account creation
Features:

    Secure login system
    User registration
    Session management


Technical Features
    Responsive Design: Works on mobile and desktop devices
    Dark Mode Support: Consistent theming across all pages
    Bootstrap 5: Modern UI components and layout
    Font Awesome: Comprehensive icon library
    Chart.js: Interactive data visualization
    Local Storage: User preferences and authentication persistence
    Authentication System: Secure login and registration


Navigation Structure

All pages feature consistent top and bottom navigation with:

    Sidebar menu with collapsible sections
    Location selector
    Settings access
    Bottom tab bar for main app sections
    Theme switching capability
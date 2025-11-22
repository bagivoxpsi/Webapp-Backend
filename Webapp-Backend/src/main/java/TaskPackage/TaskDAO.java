package TaskPackage;

import java.sql.*;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TaskDAO {

    private static final String INSERT_TASK =
        "INSERT INTO tasks (user_id, device, properties, task_time) VALUES (?, ?, ?, ?)";
    
    private static final String SELECT_TASKS_BY_USER =
        "SELECT * FROM tasks WHERE user_id = ?";
    
    private static final String URL = "jdbc:mysql://localhost:3306/smart_home";
    private static final String USER = "root";
    private static final String PASSWORD = "0000"; // replace

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // Save a task
    public void saveTask(Task task) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        String propertiesJson = mapper.writeValueAsString(task.getProperties());

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(INSERT_TASK, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, task.getUserId());
            stmt.setString(2, task.getDevice());
            stmt.setString(3, propertiesJson);
            stmt.setString(4, task.getTaskTime());

            stmt.executeUpdate();

            ResultSet rs = stmt.getGeneratedKeys();
            if(rs.next()){
                task.setTaskId(rs.getInt(1));
            }
        }
    }

    // Get all tasks for a user
    public List<Task> getTasksByUser(int userId) throws Exception {
        List<Task> tasks = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(SELECT_TASKS_BY_USER)) {

            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Task task = new Task();
                task.setTaskId(rs.getInt("task_id"));
                task.setUserId(rs.getInt("user_id"));
                task.setDevice(rs.getString("device"));

                String json = rs.getString("properties");
                Map<String, String> props = mapper.readValue(json, Map.class);
                task.setProperties(props);

                task.setTaskTime(rs.getString("task_time"));

                tasks.add(task);
            }
        }
        return tasks;
    }
}

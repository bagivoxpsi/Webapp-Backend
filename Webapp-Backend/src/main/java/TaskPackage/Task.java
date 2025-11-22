package TaskPackage;
import java.util.Map;

public class Task {
    private int taskId;      // used as primary key for tasks
    private int userId;      // foreign key to the users table
    private String device;
    private Map<String, String> properties;
    private String taskTime; // stores "HH:mm"

    // Getters and setters
    public int getTaskId() { return taskId; }
    public void setTaskId(int taskId) { this.taskId = taskId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getDevice() { return device; }
    public void setDevice(String device) { this.device = device; }

    public Map<String, String> getProperties() { return properties; }
    public void setProperties(Map<String, String> properties) { this.properties = properties; }

    public String getTaskTime() { return taskTime; }
    public void setTaskTime(String taskTime) { this.taskTime = taskTime; }
}

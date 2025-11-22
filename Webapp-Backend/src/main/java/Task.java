import java.util.Map;

public class Task {
    private int taskId;      // new: primary key
    private int userId;      // links task to user
    private String device;
    private Map<String, String> properties;
    private String time;

    // Getters and setters
    public int getTaskId() { return taskId; }
    public void setTaskId(int taskId) { this.taskId = taskId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getDevice() { return device; }
    public void setDevice(String device) { this.device = device; }

    public Map<String, String> getProperties() { return properties; }
    public void setProperties(Map<String, String> properties) { this.properties = properties; }

    public String getTime() { return time; }
    pub

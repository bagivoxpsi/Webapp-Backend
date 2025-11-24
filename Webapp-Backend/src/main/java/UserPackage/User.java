package UserPackage;

public class User {
	private int id;
	private String email;
	private String password;
	private String fullName;
	private int age;


public User() {
	
}
public User(int id, String email, String fullName, int age) {
	this.id = id;
	this.email = email;
	this.fullName = fullName;
	this.age = age;
}

public int getId() { return id; }
public void setId(int id) { this.id = id; }

public String getEmail() { return email; }
public void setEmail(String email) { this.email = email; }

public String getPassword() { return password; }
public void setPassword(String password) { this.password = password; }

public String getFullName() { return fullName; }
public void setFullName(String fullName) { this.fullName = fullName; }

public int getAge() { return age; }
public void setAge(int age) { this.age = age; }

public int getUserId() {
    return id;
}

public String getUsername() {
    return email;
}

}
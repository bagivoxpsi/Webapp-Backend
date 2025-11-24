package AddressPackage;
import java.util.Map;

public class Address {
	private int addressId;	// primary key
    private int userId;      // foreign key to the users table
    private String address;	

    // Getters and setters
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getAddressId() { return addressId; }
    public void setAddressId(int addressId) { this.addressId = addressId; } 
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address=address;}
}

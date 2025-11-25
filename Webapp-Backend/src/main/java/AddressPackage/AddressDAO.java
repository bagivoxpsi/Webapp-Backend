package AddressPackage;

import java.sql.*;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class AddressDAO {

    private static final String INSERT_ADDRESS =
        "INSERT INTO addresses (user_id, address) VALUES (?, ?)";
    
    private static final String SELECT_ADDRESSES_BY_USER =
        "SELECT * FROM addresses WHERE user_id = ?";
    
    private static final String DELETE_ADDRESS =
    		"DELETE FROM addresses WHERE address_id = ?";
    
    private static final String EDIT_ADDRESS = 
    		"UPDATE addresses SET address = ? WHERE address_id = ?";
    
    private static final String URL = "jdbc:mysql://localhost:3306/smart_home";
    private static final String USER = "root";
    private static final String PASSWORD = "0000"; // replace

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // Save address
    public void saveAddress(Address address) throws Exception {

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(INSERT_ADDRESS, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, address.getUserId());
            stmt.setString(2, address.getAddress());

            stmt.executeUpdate();
            
            ResultSet rs = stmt.getGeneratedKeys();
            if(rs.next()){
                address.setAddressId(rs.getInt(1));
            }
        }
    }

    // Get all addresses belonging to a user
    public List<Address> getAddressesByUser(int userId) throws Exception {
        List<Address> addresses = new ArrayList<>();

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(SELECT_ADDRESSES_BY_USER)) {

            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Address address = new Address();
                address.setAddressId(rs.getInt("address_id"));
                address.setUserId(rs.getInt("user_id"));
                address.setAddress(rs.getString("address"));

                addresses.add(address);
            }
        }
        return addresses;
    }
    
 // Edit an address by address_id
    public boolean editAddress(int addressId, String newAddress) throws Exception {
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(EDIT_ADDRESS)) {

            stmt.setString(1, newAddress);
            stmt.setInt(2, addressId);

            return stmt.executeUpdate() > 0; // returns true if any updates were made
        }
    }

    
    public boolean deleteAddress(int addressId) throws Exception {
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(DELETE_ADDRESS)) {

            stmt.setInt(1, addressId);
            return stmt.executeUpdate() > 0;
        }
    }

}

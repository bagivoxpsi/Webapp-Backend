package AddressPackage;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/getAddresses")
public class GetAddressesServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private AddressDAO addressDAO = new AddressDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int userId = Integer.parseInt(request.getParameter("userId"));
        ObjectMapper mapper = new ObjectMapper();

        try {
            List<Address> addresses = addressDAO.getAddressesByUser(userId);
            response.setContentType("application/json");
            response.getWriter().write(mapper.writeValueAsString(addresses));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}

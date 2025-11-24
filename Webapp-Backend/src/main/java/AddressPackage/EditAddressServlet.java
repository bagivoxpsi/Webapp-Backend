package AddressPackage;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/editAddress")
public class EditAddressServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    private AddressDAO addressDAO = new AddressDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        try {
            Address address = mapper.readValue(request.getReader(), Address.class);

            boolean edited = addressDAO.editAddress(
                    address.getAddressId(),
                    address.getAddress()
            );

            if (edited) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"status\":\"success\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"status\":\"error\",\"message\":\"Address not found or not updated\"}");
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}

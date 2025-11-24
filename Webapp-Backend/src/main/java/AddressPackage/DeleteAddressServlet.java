package AddressPackage;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/deleteAddress")
public class DeleteAddressServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    private AddressDAO addressDAO = new AddressDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String addressIdParam = request.getParameter("addressId");

        if (addressIdParam == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Missing addressId\"}");
            return;
        }

        int addressId = Integer.parseInt(addressIdParam);

        try {
            boolean deleted = addressDAO.deleteAddress(addressId);

            if (deleted) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"status\":\"success\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                response.getWriter().write("{\"status\":\"error\",\"message\":\"Address not found\"}");
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}

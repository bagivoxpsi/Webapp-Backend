package UserPackage;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@WebServlet("/signup")
public class SignupServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    private UserDAO userDAO = new UserDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        response.setContentType("application/json");

        try {
            // Parse JSON request body
        		Map<String, Object> userData = mapper.readValue(request.getReader(), Map.class);
            String email = (String) userData.get("email");
            String password = (String) userData.get("password");
            String fullName = (String) userData.get("fullName");
            Integer age = (Integer) (userData.get("age"));

            if (fullName == null || fullName.trim().length() < 2) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"status\":\"error\",\"message\":\"Full name is required\"}");
                return;
            }
            
            
            if (email == null || password == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"status\":\"error\",\"message\":\"Email and password required\"}");
                return;
            }

            if (password.length() < 6) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"status\":\"error\",\"message\":\"Password must be at least 6 characters\"}");
                return;
            }

            // Create new user
            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setAge(age);
            user.setFullName(fullName);

            try {
                userDAO.registerUser(user);

                // Create session
                HttpSession session = request.getSession();
                session.setAttribute("userId", user.getId());
                session.setAttribute("email", user.getEmail());

                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(mapper.writeValueAsString(Map.of(
                    "status", "success",
                    "message", "Account created successfully",
                    "user", user
                )));
            } catch (Exception e) {
                if (e.getMessage().contains("Duplicate entry")) {
                    response.setStatus(HttpServletResponse.SC_CONFLICT);
                    response.getWriter().write("{\"status\":\"error\",\"message\":\"Email already exists\"}");
                } else {
                    throw e;
                }
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}

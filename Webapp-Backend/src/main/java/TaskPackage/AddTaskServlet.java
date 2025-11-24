package TaskPackage;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/addTask")
public class AddTaskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    private TaskDAO taskDAO = new TaskDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        ObjectMapper mapper = new ObjectMapper();

        Task task = mapper.readValue(request.getReader(), Task.class);

        try {
            taskDAO.saveTask(task);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"status\":\"success\",\"taskId\":" + task.getTaskId() + "}");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}

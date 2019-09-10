package ted.restapi.filters;

import ted.restapi.util.JWT;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = {
        "/api/categories/*",
        "/api/items/*",
        "/api/admin/*"
})
public class AuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // Authorize (allow) all domains to consume the content
        ((HttpServletResponse) response).addHeader("Access-Control-Allow-Origin", "*");
        ((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST, DELETE");

        // For HTTP OPTIONS method reply with ACCEPTED status code -- per CORS handshake
        if (((HttpServletRequest) request).getMethod().equals("OPTIONS")) {
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }

        String jwt = ((HttpServletRequest) request).getHeader("Authorization");
        String username = JWT.getUsername(jwt);
        if(username == null) {
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().print("Invalid jwt");
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}

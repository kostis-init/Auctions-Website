package ted.restapi.filters;

import ted.restapi.util.JWT;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
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
    public void destroy() { }
}

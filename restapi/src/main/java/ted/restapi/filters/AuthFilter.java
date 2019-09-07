package ted.restapi.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = {"/api/categories/*", "/api/items/*"})
public class AuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("TESTING FILTER!!!!");

        //if jwt not valid
//        HttpServletResponse http = (HttpServletResponse) response;
//        http.sendError(HttpServletResponse.SC_FORBIDDEN);
        chain.doFilter(request, response);

    }

    @Override
    public void destroy() {

    }
}

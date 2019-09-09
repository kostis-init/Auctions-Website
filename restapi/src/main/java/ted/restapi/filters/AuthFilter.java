package ted.restapi.filters;

import ted.restapi.util.JWT;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = {"/api/categories/*", "/api/items/*"})
public class AuthFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest reqHttp = (HttpServletRequest) request;
        String jwt = reqHttp.getHeader("Authorization");
        String username = JWT.getUsername(jwt);
        if(username == null){
            HttpServletResponse respHttp = (HttpServletResponse) response;
            respHttp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            respHttp.getWriter().print("Invalid jwt");
            //respHttp.sendError(HttpServletResponse.SC_FORBIDDEN);
        } else{
            chain.doFilter(request, response);
        }


    }

    @Override
    public void destroy() {

    }
}

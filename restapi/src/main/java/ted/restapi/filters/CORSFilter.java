package ted.restapi.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CORSFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Authorize (allow) all domains to consume the content
        ((HttpServletResponse) response).addHeader("Access-Control-Allow-Origin","*");
        ((HttpServletResponse) response).addHeader("Access-Control-Allow-Headers","authorization,content-type");
        ((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST, DELETE");

        // For HTTP OPTIONS method reply with ACCEPTED status code -- per CORS handshake
        if (((HttpServletRequest) request).getMethod().equals("OPTIONS")) {
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() { }
}
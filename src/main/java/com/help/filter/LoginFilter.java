package com.help.filter;


import com.chuandu.constant.Constant;
import com.chuandu.model.Manager;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Administrator on 2015/11/10.
 */
public class LoginFilter implements Filter{
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        String uri=request.getRequestURI(); //uri就是获取到的连接地址!
        if(uri.equals("/admin")||uri.equals("/admin/")|| uri.equals("/admin/login")||uri.equals("/admin/loginNotice")||uri.equals("/admin/loginNotice")||uri.equals("/admin/logout")){
            filterChain.doFilter(servletRequest,servletResponse);
        }else{
            String requestType = request.getHeader("X-Requested-With");
            HttpSession session = request.getSession();
            Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
            if(null == manager){
                if(null == requestType){
                    request.getRequestDispatcher("/WEB-INF/admin/loginNotice.jsp").forward(request,response);
                }else{
                    //response.sendError(999);
                    response.setCharacterEncoding("UTF-8");
                    response.setContentType("application/json; charset=utf-8");
                    PrintWriter writer = response.getWriter();
                    writer.write("{\"success\":false,\"msg\":\"登录超时或者没有登录！\"}");
                    writer.flush();
                    writer.close();
                }
            }else{
                filterChain.doFilter(servletRequest,servletResponse);
            }
        }
    }

    @Override
    public void destroy() {

    }
}

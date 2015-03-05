package base.bu.controller;

import gp.app.KeyUtil;
import gp.util.SessionUtil;
import gp.util.WebUtil;
import gp.web.main.model.GpLog;
import gp.web.main.model.UserInfo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

public class RequestFilter
    implements Filter
{

    public RequestFilter()
    {
        noFilerList = null;
        filterConfig = null;
        filterEnabled = true;
        logLevel = -1;
    }

    public void destroy()
    {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
        throws IOException, ServletException
    {
         if(filterEnabled)
        {
            HttpServletRequest httpReq = (HttpServletRequest)req;
            HttpServletResponse httpResp = (HttpServletResponse)resp;
            String ctxPath = httpReq.getContextPath();
            String requestUri = httpReq.getRequestURI();
            String uri = requestUri.substring(ctxPath.length());
            String tarUri = uri.trim();
            UserInfo uInfo = SessionUtil.getAttribute("user") == null ? null : (UserInfo)SessionUtil.getAttribute("user");
            if(!isInNoFilerList(tarUri))
            {
                if(tarUri.endsWith("/") || tarUri.endsWith(".html") || tarUri.endsWith(".htm"))
                {
                    if(!tarUri.endsWith("resources/setup/setup.html") && !WebUtil.isInited())
                    {
                        httpResp.sendRedirect((new StringBuilder(String.valueOf(ctxPath))).append("/").append("resources/setup/setup.html").toString());
                        return;
                    }
                    if(!tarUri.endsWith("login.html") && !tarUri.endsWith("resources/setup/setup.html") && uInfo == null)
                    {
                        httpResp.sendRedirect((new StringBuilder(String.valueOf(ctxPath))).append("/").append("login.html").toString());
                        return;
                    }
                    if(!tarUri.endsWith("login.html") && !tarUri.endsWith("resources/setup/setup.html"))
                    {
                        StringBuilder sbErrMsg = new StringBuilder();
                        if(!KeyUtil.isExistsValidKey(sbErrMsg))
                            httpResp.sendRedirect((new StringBuilder(String.valueOf(ctxPath))).append("/").append("login.html").toString());
                    }
                } else
                if(tarUri.endsWith(".do"))
                {
                    if(!tarUri.endsWith("doLogin.do") && !tarUri.endsWith("doLogout.do") && !tarUri.endsWith("main/doSessionTimeOut.do") && !tarUri.endsWith("main/getGlobalVars.do") && !tarUri.endsWith("main/getDefaultStyleCSS.do") && uInfo == null)
                    {
                        httpResp.sendRedirect((new StringBuilder(String.valueOf(ctxPath))).append("/").append("main/doSessionTimeOut.do").toString());
                        return;
                    }
                    dowithAuthorized(httpReq, httpResp, tarUri, uInfo);
                    dowithLog(httpReq, tarUri, uInfo);
                }
            } else
            if(tarUri.endsWith(".do"))
            {
                dowithAuthorized(httpReq, httpResp, tarUri, uInfo);
                dowithLog(httpReq, tarUri, uInfo);
            }
        }
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig cfg)
        throws ServletException
    {
        filterConfig = cfg;
        filterEnabled = true;
        logLevel = -1;
        needVCode = true;
        noFilerList = new ArrayList();
        String paramValue = filterConfig.getInitParameter("filterEnabled");
        if(!WebUtil.isEmpty(paramValue) && paramValue.equalsIgnoreCase("false"))
            filterEnabled = false;
        paramValue = filterConfig.getInitParameter("logLevel");
        if(!WebUtil.isEmpty(paramValue))
            logLevel = Integer.parseInt(paramValue);
        paramValue = filterConfig.getInitParameter("noFilerList");
        if(!WebUtil.isEmpty(paramValue))
        {
            String sTmps[] = paramValue.split(";");
            String as[];
            int j = (as = sTmps).length;
            for(int i = 0; i < j; i++)
            {
                String str = as[i];
                noFilerList.add(str);
            }

        }
        paramValue = filterConfig.getInitParameter("needVCode");
        if(!WebUtil.isEmpty(paramValue) && paramValue.equalsIgnoreCase("false"))
            needVCode = false;
        WebUtil.setNeedVCode(needVCode);
    }

    private boolean isInNoFilerList(String uri)
    {
        for(Iterator iterator = noFilerList.iterator(); iterator.hasNext();)
        {
            String str = (String)iterator.next();
            if(str.equals(uri) || uri.indexOf("/webService/")!=-1 || uri.indexOf("/wordToHtml/")!=-1 || uri.indexOf("/mobile/")!=-1 || uri.indexOf("/checkUserInfo.do")!=-1 || uri.indexOf("/ueditor/")!=-1 || uri.indexOf("resources/supcan/install_chrome.htm")!=-1)//若url里包括webService，说明是移动端的接口调用，无�?���?
                return true;
        }

        return false;
    }

    private void dowithAuthorized(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse, String s, UserInfo userinfo)
    {
    }

    private void dowithLog(HttpServletRequest httpReq, String tarUri, UserInfo uInfo)
    {
        String sMethod = httpReq.getParameter("method");
        switch(logLevel)
        {
        default:
            break;

        case 0: // '\0'
            if(tarUri.endsWith("doLogin.do") || tarUri.endsWith("doLogout.do"))
                addLog(httpReq, tarUri, uInfo);
            break;

        case 1: // '\001'
            if(tarUri.endsWith("doLogin.do") || tarUri.endsWith("doLogout.do"))
            {
                addLog(httpReq, tarUri, uInfo);
                break;
            }
            if(sMethod == null)
                break;
            String sm = sMethod.toLowerCase();
            if(sm.startsWith("add") || sm.startsWith("update") || sm.startsWith("delete"))
                addLog(httpReq, tarUri, uInfo);
            break;

        case 2: // '\002'
            addLog(httpReq, tarUri, uInfo);
            break;
        }
    }

    private void addLog(HttpServletRequest httpReq, String tarUri, UserInfo uInfo)
    {
        GpLog gplog = new GpLog();
        gplog.setLogdtm(new Date());
        gplog.setClientip(getClientIP(httpReq));
        String sLoginID = uInfo == null ? "" : uInfo.getLogin_id();
        if(tarUri.endsWith("doLogin.do"))
            sLoginID = httpReq.getParameter("login_id");
        gplog.setLogin_id(sLoginID);
        gplog.setS_path(tarUri);
        String sMethod = httpReq.getParameter("method");
        gplog.setS_method(sMethod);
        String sData = httpReq.getParameter("data");
        gplog.setS_data(sData);
        WebUtil.getGplogger().log(gplog);
    }

    private String getClientIP(HttpServletRequest httpReq)
    {
        String ip = httpReq.getHeader("x-forwarded-for");
        ip = ip != null ? ip.trim() : "";
        if(ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = httpReq.getHeader("Proxy-Client-IP");
        } else
        {
            String ips[] = ip.split(",");
            if(ips.length > 0)
                ip = ips[0];
        }
        ip = ip != null ? ip.trim() : "";
        if(ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
            ip = httpReq.getHeader("WL-Proxy-Client-IP");
        ip = ip != null ? ip.trim() : "";
        if(ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
            ip = httpReq.getRemoteAddr();
        ip = ip != null ? ip.trim() : "";
        if(ip.indexOf("0:0:0:0:0:0:0:1") >= 0 || ip.indexOf("::1") >= 0)
            ip = "127.0.0.1";
        return ip;
    }

    private static Logger logger = Logger.getLogger("service");
    protected FilterConfig filterConfig;
    protected boolean filterEnabled;
    protected int logLevel;
    protected boolean needVCode;
    protected List noFilerList;

}


/*
	DECOMPILATION REPORT

	Decompiled from: E:\workspace\GinPlusTest\WebContent\WEB-INF\lib\gplus.jar
	Total time: 281 ms
	Jad reported messages/errors:
	Exit status: 0
	Caught exceptions:
*/
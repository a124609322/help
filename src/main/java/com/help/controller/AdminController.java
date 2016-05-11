package com.help.controller;

import com.chuandu.constant.Constant;
import com.chuandu.model.Manager;
import com.chuandu.model.Menu;
import com.chuandu.service.ManagerServcie;
import com.chuandu.service.MenuService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller
@RequestMapping("/admin")
public class AdminController extends BaseController {

    private Logger logger = Logger.getLogger(AdminController.class);

    @Autowired
    private ManagerServcie managerServcie;

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "",method = RequestMethod.GET)
    public String index(HttpSession session){
        Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
        if(null == manager){
            return "WEB-INF/admin/login";
        }
       return "WEB-INF/admin/index";
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(Manager manager,HttpSession session,Model model){
        try {
            Manager temp = managerServcie.login(manager);
            if(null == temp){
                model.addAttribute("login_result","用户名或者密码不正确！");
                return "WEB-INF/admin/login";
            }
            temp.setPassword(null);
            session.setAttribute(Constant.SESSION_KEY,temp);
            model.addAttribute("login_result", "success");
            return "WEB-INF/admin/index";
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            model.addAttribute("login_result", "用户名或者密码不正确！");
        }
        return "WEB-INF/admin/login";
    }

    @RequestMapping(value = "/menu",method = RequestMethod.GET)
    @ResponseBody
    public Model menuList(HttpSession session,Model model){
        Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
        success = false;
        if(null == manager){
            msg = "您尚未登录，请重新登录后再做该操作！";
        }else{
            try {
                List<Menu> menuList = menuService.findMenuesByManagerId(manager.getId());
                model.addAttribute("menuList",menuList);
                model.addAttribute("manager",manager);
                success = true;
                msg = "查询成功！";
            } catch (Exception e) {
                logger.error(e.getMessage(),e);
                msg = "请求失败，请重试！";
            }
        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value = "/menu",method = RequestMethod.POST)
    @ResponseBody
    public Model menu(Menu menu,Model model){
        success = false;
        try {
            Menu temp = menuService.findMenuByName(menu.getMenuname());
            model.addAttribute("menu",temp);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            msg = "请求失败，请重试！";
        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpSession session){
        session.removeAttribute(Constant.SESSION_KEY);
        return "/WEB-INF/admin/login";
    }
}

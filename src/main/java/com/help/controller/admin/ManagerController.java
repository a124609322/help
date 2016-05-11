package com.help.controller.admin;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Manager;
import com.chuandu.service.ManagerServcie;
import com.chuandu.vo.Pager;
import com.mysql.jdbc.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller
@RequestMapping("/admin/manager")
public class ManagerController extends BaseController {

    private Logger logger = Logger.getLogger(ManagerController.class);

    @Autowired
    private ManagerServcie managerServcie;

    @RequestMapping(value = "/resetPassword",method = RequestMethod.POST)
    public Model resetPassword(String password,String oldPassword ,Model model,HttpSession session){
        Manager temp = (Manager)session.getAttribute(Constant.SESSION_KEY);
        success = false;
        try {
            success = managerServcie.resetPassword(password,oldPassword,temp.getId());
            if(success){
                msg ="修改成功！";
            }
            else{
                msg ="原始密码不正确~！";
            }
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            msg = "请求失败，请重试~！";
        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model managerList(Pager pager,Model model,String managerName){
        if(!StringUtils.isNullOrEmpty(managerName)){
            pager.getDataMap().put("name",managerName.trim());
        }
        List<Manager> managerList = null;
        try {
            managerList = managerServcie.selectPagerWithManagerRole(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("managerList",managerList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }


    @RequestMapping(value="/add",method = RequestMethod.POST)
    public Model addManager(Manager manager,Model model,HttpSession session){
        success = true;
        msg = "保存成功！";
        boolean isRepeat = true;
        try {
            isRepeat = managerServcie.save(manager);
            if(isRepeat){
                msg = "登录名已经存在，请重新添加！";
            }
            success = true;
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("isRepeat",isRepeat);
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value="/modify",method = RequestMethod.POST)
    public Model modifyManager(Manager manager,Model model){
        success = true;
        msg = "保存成功！";
        try {
            managerServcie.updateManager(manager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }
    @RequestMapping(value="/delete",method = RequestMethod.POST)
    public Model deleteMangaer(String[] idList,Model model){
        boolean success = true;
        try {
            managerServcie.deleteList(idList);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
        }
        model.addAttribute("success",success);
        return model;
    }
}

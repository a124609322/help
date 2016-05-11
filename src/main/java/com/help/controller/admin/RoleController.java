package com.help.controller.admin;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Manager;
import com.chuandu.model.Role;
import com.chuandu.service.ManagerServcie;
import com.chuandu.service.RoleServcie;
import com.chuandu.vo.Pager;
import com.mysql.jdbc.StringUtils;
import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Administrator on 2016/3/30.
 */
@Controller
@RequestMapping("/admin/role")
public class RoleController extends BaseController{

    private Logger logger = Logger.getLogger(RoleController.class);

    @Autowired
    private RoleServcie roleServcie;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model roleList(Pager pager,Model model,String managerName){
        if(!StringUtils.isNullOrEmpty(managerName)){
            pager.getDataMap().put("name",managerName.trim());
        }
        List<Role> roleList = null;
        try {
            roleList = roleServcie.selectPagerWithManagerRole(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("roleList",roleList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }

    @RequestMapping(value = "/listAll",method = RequestMethod.GET)
    @ResponseBody
    public Model roleListAll(Model model){
        List<Role> roleList = null;
        try {
            roleList = roleServcie.selectAll();
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("roleList",roleList);
        return model;
    }

    @RequestMapping(value="/add",method = RequestMethod.POST)
    public Model add(Role role,Model model,String[] menuIdList){
        success = true;
        msg = "保存成功！";
        boolean isRepeat = true;
        try {
            isRepeat = roleServcie.save(role,menuIdList);
            if(isRepeat){
                msg = "角色名称重复，请重新输入~！";
            }
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success",success);
        model.addAttribute("isRepeat",isRepeat);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value="/modify",method = RequestMethod.POST)
    public Model modify(Role role,Model model,String[] menuIdList){
        success = true;
        msg = "保存成功！";
        boolean isRepeat = true;
        try {
            isRepeat = roleServcie.update(role, menuIdList);
            if(isRepeat){
                msg = "角色名称重复，请重新输入~！";
            }
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败,请重试！";
        }
        model.addAttribute("success",success);
        model.addAttribute("isRepeat",isRepeat);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value="/delete",method = RequestMethod.POST)
    public Model deleteRole(String[] idList,Model model){
        success = true;
        try {
            roleServcie.deleteList(idList);
            msg = "删除成功~！";
        } catch (Exception e) {
            msg = "操作失败,请重试！";
            if(e instanceof DataIntegrityViolationException){
                msg = "该角色下面关联管理员用户，不能删除~！";
            }
            logger.error(e.getMessage(),e);
            success = false;

        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }
}

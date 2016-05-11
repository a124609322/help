package com.help.controller.admin;

import com.chuandu.controller.BaseController;
import com.chuandu.model.Manager;
import com.chuandu.model.Menu;
import com.chuandu.model.Role;
import com.chuandu.service.MenuService;
import com.chuandu.service.RoleServcie;
import com.chuandu.vo.Pager;
import com.chuandu.vo.TreeNode;
import com.mysql.jdbc.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/admin/menu")
public class MenuController extends BaseController{

    private Logger logger = Logger.getLogger(MenuController.class);

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "/listTreeAll",method = RequestMethod.GET)
    @ResponseBody
    public Model menuTreeListAll(Model model,String id,String roleId){
        List<TreeNode> treeList = null;
        try {
            treeList = menuService.selectMenuTreByRoleId(id,roleId);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("treeList",treeList);
        return model;
    }
}

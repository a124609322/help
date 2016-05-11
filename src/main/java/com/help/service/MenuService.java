package com.help.service;

import com.chuandu.model.Menu;
import com.chuandu.model.Role;
import com.chuandu.vo.TreeNode;

import java.util.List;

/**
 * Created by Administrator on 2016/3/29.
 */
public interface MenuService {
    List<Menu> findMenuesByManagerId(String id);

    Menu findMenuByName(String menuname);

    List<TreeNode> selectAllTree(String id);

    List<TreeNode> selectMenuTreByRoleId(String id, String roleId);
}

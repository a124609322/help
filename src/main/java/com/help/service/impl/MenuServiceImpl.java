package com.help.service.impl;

import com.chuandu.dao.MenuMapper;
import com.chuandu.model.Menu;
import com.chuandu.model.Role;
import com.chuandu.service.MenuService;
import com.chuandu.vo.TreeNode;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/29.
 */
@Service
public class MenuServiceImpl extends BaseService implements MenuService{

    @Resource
    private MenuMapper menuMapper;

    @Override
    public List<Menu> findMenuesByManagerId(String id) {
        return menuMapper.findMenuesByManagerId(id);
    }

    @Override
    public Menu findMenuByName(String menuname) {
        return menuMapper.findMenuByName(menuname);
    }

    @Override
    public List<TreeNode> selectAllTree(String id) {
        List<Map<String,Object>> resultMap = menuMapper.selectAllTree(id);
        TreeNode treeNode = null;
        TreeNode childNode = null;
        List<TreeNode> children = null;
        List<TreeNode> result = new ArrayList<TreeNode>();
        for(Map<String,Object> m : resultMap){
            if(m.get("parentId") == null){
                treeNode = new TreeNode();
                if(m.get("roleId") != null){
                    treeNode.setChecked(true);
                }
                treeNode.setId((String) m.get("id"));
                treeNode.setText((String) m.get("menunameroleId"));
                treeNode.setExpanded(false);
                treeNode.setLeaf(false);
                children = new ArrayList<TreeNode>();
                for(Map<String,Object> mc : resultMap){
                    String parentId = (String)mc.get("parentId");
                    if(parentId != null && parentId.equals(treeNode.getId())){
                        childNode = new TreeNode();
                        if(mc.get("roleId") != null){
                            childNode.setChecked(true);
                        }
                        childNode.setId((String) mc.get("id"));
                        childNode.setText((String) mc.get("text"));
                        childNode.setExpanded(false);
                        childNode.setLeaf(true);
                        children.add(childNode);
                    }
                }
                treeNode.setChildren(children);
                result.add(treeNode);
            }
        }
        return result;
    }

    @Override
    public List<TreeNode> selectMenuTreByRoleId(String id, String roleId) {
        List<Map<String,Object>> resultMap = menuMapper.selectMenuTreByRoleId(id,roleId);
        TreeNode treeNode = null;
        List<TreeNode> result = new ArrayList<TreeNode>();
        for(Map<String,Object> m : resultMap){
                treeNode = new TreeNode();
                if(m.get("roleId") != null){
                    treeNode.setChecked(true);
                }
                treeNode.setId((String) m.get("id"));
                treeNode.setText((String) m.get("menuname"));
                String parentId = (String)m.get("parentId");
                if(parentId != null){
                    treeNode.setExpanded(false);
                    treeNode.setLeaf(true);
                }else{
                    treeNode.setExpanded(true);
                    treeNode.setLeaf(false);
                }
                result.add(treeNode);
        }
        return result;
    }
}

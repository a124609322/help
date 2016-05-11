package com.help.service.impl;

import com.chuandu.dao.MenuMapper;
import com.chuandu.dao.RoleMapper;
import com.chuandu.model.Role;
import com.chuandu.service.RoleServcie;
import com.chuandu.util.CommonUtil;
import com.chuandu.util.MD5;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2016/3/30.
 */
@Service
public class RoleServiceImpl extends BaseService implements RoleServcie {

    @Resource
    private RoleMapper roleMapper;

    @Override
    public List<Role> selectPagerWithManagerRole(Pager pager) {
        int count = roleMapper.selectPagerForCount(pager);
        pager.setTotal(count);
        return roleMapper.selectPager(pager);
    }

    @Override
    public List<Role> selectAll() {
        return roleMapper.selectAll();
    }

    @Override
    public boolean save(Role role, String[] menuIdList) {
        Role temp = roleMapper.findByName(role.getRolename());
        if(null != temp){
            return true;
        }
        role.setId(CommonUtil.uuid());
        role.setCreatedate(new Date());
        role.setDeleted(1);
        roleMapper.insert(role);
        if(null == menuIdList || menuIdList.length <= 0){
            return false;
        }
        for(String menuId : menuIdList){
            roleMapper.insertMenu(role.getId(), menuId);
        }
        return false;
    }

    @Override
    public boolean update(Role role, String[] menuIdList) {
        Role temp = roleMapper.findByName(role.getRolename());
        if(null != temp && !temp.getId().equals(role.getId())){
            return true;
        }
        roleMapper.deleteMenuByRoleId(role.getId());
        role.setModifydate(new Date());
        roleMapper.updateByPrimaryKeySelective(role);
        for(String menuId : menuIdList){
            roleMapper.insertMenu(role.getId(), menuId);
        }
        return false;
    }

    @Override
    public void deleteList(String[] idList) {
        for(String id : idList){
            roleMapper.deleteMenuByRoleId(id);
            roleMapper.deleteByPrimaryKey(id);
        }
    }

}

package com.help.dao;

import com.chuandu.model.Role;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleMapper {
    int deleteByPrimaryKey(String id);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);

    List<Role> selectAll();

    int selectPagerForCount(Pager pager);

    List<Role> selectPager(Pager pager);

    Role findByName(String rolename);

    void insertMenu(String id, String menuId);

    void deleteMenuByRoleId(String id);
}
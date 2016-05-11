package com.help.dao;

import com.chuandu.model.Menu;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MenuMapper {
    int deleteByPrimaryKey(String id);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);

    List<Menu> findMenuesByManagerId(String id);

    Menu findMenuByName(String menuname);

    List<Map<String,Object>> selectAllTree(String id);

    List<Map<String,Object>> selectMenuTreByRoleId(String id, String roleId);
}
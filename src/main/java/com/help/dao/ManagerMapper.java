package com.help.dao;

import com.chuandu.model.Manager;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerMapper {
    int deleteByPrimaryKey(String id);

    int insert(Manager record);

    int insertSelective(Manager record);

    Manager selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Manager record);

    int updateByPrimaryKey(Manager record);

    Manager findByName(String loginname);

    void resetPassword(Manager manager);

    int selectPagerWithManagerRoleForCount(Pager pager);

    List<Manager> selectPagerWithManagerRole(Pager pager);
}
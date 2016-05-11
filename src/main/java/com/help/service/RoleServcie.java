package com.help.service;

import com.chuandu.model.Manager;
import com.chuandu.model.Role;
import com.chuandu.vo.Pager;

import java.util.List;

/**
 * Created by Administrator on 2016/3/30.
 */
public interface RoleServcie {
    List<Role> selectPagerWithManagerRole(Pager pager);

    List<Role> selectAll();

    boolean save(Role role, String[] menuIdList);

    boolean update(Role role, String[] menuIdList);

    void deleteList(String[] idList);
}

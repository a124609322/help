package com.help.service;

import com.chuandu.model.Manager;
import com.chuandu.vo.Pager;

import java.security.NoSuchAlgorithmException;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
public interface ManagerServcie {

    Manager login(Manager manager);

    boolean resetPassword(String password, String oldPassword, String id) throws NoSuchAlgorithmException;

    List<Manager> selectPagerWithManagerRole(Pager pager);

    boolean save(Manager manager) throws NoSuchAlgorithmException;

    void updateManager(Manager manager);

    void deleteList(String[] idList);
}

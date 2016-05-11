package com.help.service.impl;

import com.chuandu.dao.ManagerMapper;
import com.chuandu.model.Manager;
import com.chuandu.service.ManagerServcie;
import com.chuandu.util.CommonUtil;
import com.chuandu.util.MD5;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Service
public class ManagerServiceImpl extends BaseService implements ManagerServcie {

    @Resource
    private ManagerMapper managerMapper;

    @Override
    public Manager login(Manager manager) {
        Manager temp = managerMapper.findByName(manager.getLoginname());
        if(null == temp || null == manager.getPassword() || "".equals(manager.getPassword().trim())){
            return null;
        }
        String tempPwd = "";
        try {
            tempPwd = MD5.encrypByMd5(manager.getPassword());
        } catch (NoSuchAlgorithmException e) {
            logger.error(e.getMessage(),e);
            return null;
        }
        if(!temp.getPassword().equals(tempPwd)){
            return null;
        }
        return temp;
    }

    @Override
    public boolean resetPassword(String password, String oldPassword, String id) throws NoSuchAlgorithmException {
        Manager manager = managerMapper.selectByPrimaryKey(id);
        if(manager.getPassword().equals(MD5.encrypByMd5(oldPassword))){
            manager.setPassword(MD5.encrypByMd5(password));
            managerMapper.resetPassword(manager);
            return true;
        }
        return false;
    }
    @Override
    public List<Manager> selectPagerWithManagerRole(Pager pager) {
        int count = managerMapper.selectPagerWithManagerRoleForCount(pager);
        pager.setTotal(count);
        return managerMapper.selectPagerWithManagerRole(pager);
    }

    @Override
    public boolean save(Manager manager) throws NoSuchAlgorithmException {
        Manager temp = managerMapper.findByName(manager.getLoginname());
        if(null != temp){
            return true;
        }
        manager.setId(CommonUtil.uuid());
        manager.setCreatedate(new Date());
        manager.setDeleted(1);
        manager.setPassword(MD5.encrypByMd5(manager.getPassword()));
        managerMapper.insert(manager);
        return false;
    }

    @Override
    public void updateManager(Manager manager) {
        manager.setModifydate(new Date());
        managerMapper.updateByPrimaryKeySelective(manager);
    }

    @Override
    public void deleteList(String[] idList) {
        for(String id : idList){
            managerMapper.deleteByPrimaryKey(id);
        }
    }
}

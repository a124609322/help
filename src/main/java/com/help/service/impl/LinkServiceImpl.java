package com.help.service.impl;

import com.chuandu.dao.LinkMapper;
import com.chuandu.dao.ManagerMapper;
import com.chuandu.model.Link;
import com.chuandu.model.Manager;
import com.chuandu.service.LinkServcie;
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
public class LinkServiceImpl extends BaseService implements LinkServcie {

    @Resource
    private LinkMapper linkMapper;

    @Override
    public List<Link> selectPager(Pager pager) {
        int count = linkMapper.selectPagerForCount(pager);
        pager.setTotal(count);
        return linkMapper.selectPager(pager);
    }

    @Override
    public void save(Link link) {

        link.setCreatedate(new Date());
        link.setDeleted(1);
        linkMapper.insert(link);
    }

    @Override
    public void update(Link link) {
        link.setModifydate(new Date());
        linkMapper.updateByPrimaryKeySelective(link);
    }

    @Override
    public void deleteList(String[] idList) {
        for(String id : idList){
            linkMapper.deleteByPrimaryKey(id);
        }
    }

    @Override
    public Link findById(String id) {
        return linkMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Link> selectAll() {
        return linkMapper.selectAll();
    }
}

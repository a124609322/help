package com.help.service.impl;

import com.chuandu.dao.BannerMapper;
import com.chuandu.dao.ManagerMapper;
import com.chuandu.model.Banner;
import com.chuandu.model.Manager;
import com.chuandu.service.BannerServcie;
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
public class BannerServiceImpl extends BaseService implements BannerServcie {

    @Resource
    private BannerMapper bannerMapper;

    @Override
    public List<Banner> selectPager(Pager pager) {
        int count = bannerMapper.selectPagerForCount(pager);
        pager.setTotal(count);
        return bannerMapper.selectPager(pager);
    }

    @Override
    public void save(Banner banner){
        banner.setCreatedate(new Date());
        banner.setDeleted(1);
        bannerMapper.insert(banner);
    }

    @Override
    public void update(Banner banner) {
        banner.setModifydate(new Date());
        bannerMapper.updateByPrimaryKeySelective(banner);
    }

    @Override
    public void deleteList(String[] idList) {
        for(String id : idList){
            bannerMapper.deleteByPrimaryKey(id);
        }
    }

    @Override
    public Banner findById(String id) {
        return bannerMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Banner> selectAll(Pager pager) {
        return bannerMapper.selectAll();
    }
}

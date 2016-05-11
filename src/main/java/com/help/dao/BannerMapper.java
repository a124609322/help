package com.help.dao;

import com.chuandu.model.Banner;
import com.chuandu.model.Manager;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerMapper {
    int deleteByPrimaryKey(String id);

    int insert(Banner record);

    int insertSelective(Banner record);

    Banner selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Banner record);

    int updateByPrimaryKey(Banner record);

    int selectPagerForCount(Pager pager);

    List<Banner> selectPager(Pager pager);

    List<Banner> selectAll();
}
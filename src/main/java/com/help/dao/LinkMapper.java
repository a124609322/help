package com.help.dao;

import com.chuandu.model.Link;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LinkMapper {
    int deleteByPrimaryKey(String id);

    int insert(Link record);

    int insertSelective(Link record);

    Link selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Link record);

    int updateByPrimaryKey(Link record);

    int selectPagerForCount(Pager pager);

    List<Link> selectPager(Pager pager);

    List<Link> selectAll();
}
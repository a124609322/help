package com.help.service;

import com.chuandu.model.Link;
import com.chuandu.vo.Pager;

import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
public interface LinkServcie {

    List<Link> selectPager(Pager pager);

    void save(Link link);

    void update(Link link);

    void deleteList(String[] idList);

    Link findById(String id);

    List<Link> selectAll();
}

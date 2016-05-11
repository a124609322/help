package com.help.service;

import com.chuandu.model.Banner;
import com.chuandu.vo.Pager;

import java.util.List;

/**
 * Created by Administrator on 2016/4/6.
 */
public interface BannerServcie {
    List<Banner> selectPager(Pager pager);

    void save(Banner banner);

    void update(Banner banner);

    void deleteList(String[] idList);

    Banner findById(String id);

    List<Banner> selectAll(Pager pager);
}

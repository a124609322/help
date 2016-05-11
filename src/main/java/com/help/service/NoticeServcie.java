package com.help.service;

import com.chuandu.model.Notice;
import com.chuandu.vo.Pager;

import java.text.ParseException;
import java.util.List;

/**
 * Created by Administrator on 2016/4/14.
 */
public interface NoticeServcie {
    List<Notice> selectPager(Pager pager);

    boolean save(Notice notice) throws ParseException;

    boolean update(Notice notice);

    void deleteList(String[] idList);

    void updateTop(Notice notice) throws ParseException;

    boolean updateRoll(Notice notice);

    Notice select(Notice notice);

    List<Notice> selectAll();
}

package com.help.dao;

import com.chuandu.model.Notice;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeMapper {
    int deleteByPrimaryKey(String id);

    int insert(Notice record);

    int insertSelective(Notice record);

    Notice selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Notice record);

    int updateByPrimaryKeyWithBLOBs(Notice record);

    int updateByPrimaryKey(Notice record);

    int selectPagerForCount(Pager pager);

    List<Notice> selectPager(Pager pager);

    Notice findByTypes(Notice notice);

    List<Notice> selectRoll();

    List<Notice> selectByTypes(String types);

    List<Notice> selectAll();
}
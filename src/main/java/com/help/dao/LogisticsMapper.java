package com.help.dao;

import com.chuandu.model.Logistics;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogisticsMapper {
    int deleteByPrimaryKey(String id);

    int insert(Logistics record);

    int insertSelective(Logistics record);

    Logistics selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Logistics record);

    int updateByPrimaryKey(Logistics record);

    int selectPagerForCount(Pager pager);

    List<Logistics> selectPager(Pager pager);

    List<Logistics> selectByWayBillId(String id);

    void deleteByWaybillKey(String id);
}
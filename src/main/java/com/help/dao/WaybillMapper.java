package com.help.dao;

import com.chuandu.model.Waybill;
import com.chuandu.vo.Pager;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface WaybillMapper {
    int deleteByPrimaryKey(String id);

    int insert(Waybill record);

    int insertSelective(Waybill record);

    Waybill selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Waybill record);

    int updateByPrimaryKey(Waybill record);

    int selectPagerForCount(Pager pager);

    List<Waybill> selectPager(Pager pager);

    Waybill findByCode(Map<String, Object> code);

    List<Waybill> findByBatchCode(Map<String, Object> batchcode);

    void clearup();

    void setDeleteByPrimaryKey(String id, int deleted);

    void updateByCode(Waybill waybill);

    void updateRobotInfo(Map<String, Object> params);
}
package com.help.dao;

import com.chuandu.model.Robot;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RobotMapper {
    int deleteByPrimaryKey(String id);

    int insert(Robot record);

    int insertSelective(Robot record);

    Robot selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Robot record);

    int updateByPrimaryKey(Robot record);

    List<Robot> selectAuto();
}
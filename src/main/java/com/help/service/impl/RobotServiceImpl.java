package com.help.service.impl;

import com.chuandu.dao.RobotMapper;
import com.chuandu.model.Robot;
import com.chuandu.service.RobotService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2016/4/20.
 */
@Service
public class RobotServiceImpl extends BaseService implements RobotService{
    @Resource
    private RobotMapper robotMapper;

    @Override
    public List<Robot> selectAuto() {
        return robotMapper.selectAuto();
    }
}

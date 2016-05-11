package com.help.interval;


import com.chuandu.model.Robot;
import com.chuandu.service.LogisticsServcie;
import com.chuandu.service.RobotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/4/20.
 */
@Component("robotInterval")
public class RobotInterval implements  Interval {

    public static final List<Thread> robotThreads = new ArrayList<Thread>();

    @Autowired
    private LogisticsServcie logisticsServcie;

    @Autowired
    private RobotService robotService;

    @Override
    public void handleWayBill(List<Robot> robotList) {
        for(Robot robot : robotList){
            Thread robotThread = new RobotRunable(robot,logisticsServcie);
            robotThread.start();
            robotThreads.add(robotThread);
        }
    }

    @PostConstruct
    public void iniRobot(){
        List<Robot> robotList = robotService.selectAuto();
        handleWayBill(robotList);
    }
}

package com.help.interval;

import com.chuandu.model.Robot;
import com.chuandu.service.LogisticsServcie;
import com.mysql.jdbc.StringUtils;
import org.apache.log4j.Logger;


/**
 * Created by Administrator on 2016/4/20.
 */
public class RobotRunable extends Thread {

    private Logger logger = Logger.getLogger(RobotRunable.class);

    private Robot robot;

    private LogisticsServcie logisticsServcie;

    public RobotRunable(Robot robot, LogisticsServcie logisticsServcie) {
        this.robot = robot;
        this.logisticsServcie = logisticsServcie;
    }

    @Override
    public void run() {
        Long interval = handleInterval(robot.getInterval());
        boolean flag = false;
        while(true){
            try {
                Thread.sleep(interval);
                flag = logisticsServcie.autoHandleWaybill(robot);
                if(flag){
                    break;
                }
            } catch (InterruptedException e) {
                logger.error(e.getMessage(),e);
            } catch (Exception e){
                logger.error(e.getMessage(),e);
            }
        }
        RobotInterval.robotThreads.remove(this);
    }

    private long handleInterval(String time){
        if(StringUtils.isNullOrEmpty(time)){
            return 0L;
        }
        long result = 0L;
        String[] times = time.split(":");
        long hour = Long.parseLong(times[0])*60*60*1000;
        long minues = Long.parseLong(times[1])*60*1000;
        long second = Long.parseLong(times[2])*1000;
        result = hour + minues + second;
        return result;
    }
}

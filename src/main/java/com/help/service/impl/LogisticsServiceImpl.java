package com.help.service.impl;

import com.chuandu.constant.Constant;
import com.chuandu.dao.LogisticsMapper;
import com.chuandu.dao.RobotMapper;
import com.chuandu.dao.WaybillMapper;
import com.chuandu.model.Logistics;
import com.chuandu.model.Robot;
import com.chuandu.model.Waybill;
import com.chuandu.service.LogisticsServcie;
import com.chuandu.util.CommonUtil;
import com.chuandu.util.ExcelUtil;
import com.chuandu.vo.Pager;
import com.mysql.jdbc.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Created by Administrator on 2016/3/28.
 */
@Service
public class LogisticsServiceImpl extends BaseService implements LogisticsServcie {

    @Resource
    private LogisticsMapper logisticsMapper;

    @Resource
    private WaybillMapper waybillMapper;

    @Resource
    private RobotMapper robotMapper;

    @Override
    public List<Logistics> selectPager(Pager pager) {
        int count = logisticsMapper.selectPagerForCount(pager);
        pager.setTotal(count);
        return logisticsMapper.selectPager(pager);
    }

    @Override
    public boolean save(Logistics logistics) throws IOException {
        Map<String,Object> param = new HashMap<String, Object>();
        String code = logistics.getWaybill().getCode();
        if(code == null ){
            return false;
        }
        if(code.matches(CommonUtil.getPropertiesValue("config.properties", "batchcodeRegex"))){
            param.put("batchcode",code);
            List<Waybill> tempList  = waybillMapper.findByBatchCode(param);
            if(null == tempList || tempList.size() <=0){
                return false;
            }
            for(Waybill temp : tempList){
                logistics.setLogo(Constant.LOGISTICS_LOGO_MANUAL);
                logistics.setOrigin(Constant.LOGISTICS_ORIGIN_MANUAL);
                logistics.setWaybillid(temp.getId());
                logistics.setId(CommonUtil.uuid());
                logistics.setCreatedate(new Date());
                logistics.setDeleted(1);
                logisticsMapper.insertSelective(logistics);
            }
            return true;
        }else{
            param.put("code",code);
            Waybill temp = waybillMapper.findByCode(param);
            if (null == temp) {
                return false;
            }
            logistics.setLogo(Constant.LOGISTICS_LOGO_MANUAL);
            logistics.setOrigin(Constant.LOGISTICS_ORIGIN_MANUAL);
            logistics.setWaybillid(temp.getId());
            logistics.setId(CommonUtil.uuid());
            logistics.setCreatedate(new Date());
            logistics.setDeleted(1);
            logisticsMapper.insertSelective(logistics);
            return true;
        }
    }

    @Override
    public void update(Logistics logistics) {
        logistics.setModifydate(new Date());
        logisticsMapper.updateByPrimaryKeySelective(logistics);
    }

    @Override
    public void deleteList(String[] idList) {
        for (String id : idList) {
            logisticsMapper.deleteByPrimaryKey(id);
        }
    }

    @Override
    public Map<String, Object> batchupdate(InputStream inputStream, String id) throws IOException, InvalidFormatException {
        Map<String, Object> result = new HashMap<String, Object>();
        String[] titleValid = CommonUtil.getPropertiesValue("excel.properties", "batchupdate").split(" ");
        String[][] content = ExcelUtil.readExcel(inputStream);
        String[] titleArray = content[0];
        if (titleValid.length != titleArray.length) {
            result.put("success", false);
            result.put("msg", "Excel标题格式不符合要求，请重新上传~！");
            return result;
        }
        for (int i = 0; i < titleValid.length; i++) {
            if (!titleValid[i].equals(titleArray[i])) {
                result.put("success", false);
                result.put("msg", "Excel标题格式不符合要求，请重新上传~！");
                return result;
            }
        }
        Robot robot = null;
        List<Robot> robotList = new ArrayList<Robot>();
        String[] row;
        String cell;
        for (int i = 1; i < content.length; i++) {
            robot = new Robot();
            row = content[i];
            for (int j = 0; j < row.length; j++) {
                cell = row[j];
                switch (j) {
                    case Constant.IMPORT_ROBOT_CODE:
                        robot.setBatchcode(CommonUtil.handlerExcelDouble(cell));
                        if (StringUtils.isNullOrEmpty(robot.getBatchcode())) {
                            result.put("success", false);
                            result.put("msg", "Excel第" + i + "行" + "单号为空，请重新上传~！");
                            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                            return result;
                        }
                        break;
                    case Constant.IMPORT_ROBOT_CHANNEL:
                        robot.setChannel(cell);
                        break;
                    case Constant.IMPORT_ROBOT_AUTO:
                        if("Yes".equalsIgnoreCase(cell)){
                            robot.setIsautoupdate(Constant.ROBOT_AUTO_TRUE);
                        }else{
                            robot.setIsautoupdate(Constant.ROBOT_AUTO_FALSE);
                        }
                        break;
                    case Constant.IMPORT_ROBOT_CURRENT:
                        robot.setCurrentstate(cell);
                        break;
                    case Constant.IMPORT_ROBOT_STATE1:
                        robot.setState1(cell);
                        break;
                    case Constant.IMPORT_ROBOT_STATE2:
                        robot.setState2(cell);
                        break;
                    case Constant.IMPORT_ROBOT_STATE3:
                        robot.setState3(cell);
                        break;
                    case Constant.IMPORT_ROBOT_STATE4:
                        robot.setState4(cell);
                        break;
                    case Constant.IMPORT_ROBOT_STATE5:
                        robot.setState5(cell);
                        break;
                    case Constant.IMPORT_ROBOT_STATE6:
                        robot.setState6(cell);
                        break;
                    case Constant.IMPORT_ROBOT_INTERVAL:
                        robot.setInterval(cell);
                        break;
                }
            }
            robot.setId(CommonUtil.uuid());
            robot.setDeleted(1);
            robot.setCreatedate(new Date());
            robot.setManagerid(id);
            robotMapper.insertSelective(robot);
            handleWaybill(robot);
            if(robot.getIsautoupdate() == Constant.ROBOT_AUTO_TRUE){
                robotList.add(robot);
            }
        }
        result.put("success", true);
        result.put("msg", "导入成功~！");
        result.put("robotList",robotList);
        return result;
    }

    /**
     * 根据机器人更新运单状态和当前物流状态
     * @param robot
     */
    private void handleWaybill(Robot robot) throws IOException {
        String regex = CommonUtil.getPropertiesValue("config.properties","batchcodeRegex");
        Map<String,Object> params = new HashMap<String, Object>();
        List<Waybill> waybillList = new ArrayList<Waybill>();
        Waybill temp = null;
        if(robot.getBatchcode().matches(regex)){
            params.put("batchcode",robot.getBatchcode());
            waybillList = waybillMapper.findByBatchCode(params);
        }else{
            params.put("code",robot.getBatchcode());
            temp = waybillMapper.findByCode(params);
            if(null != temp){
                waybillList.add(temp);
            }
        }
        params.put("channel",robot.getChannel());
        params.put("isautoupdate",robot.getIsautoupdate());
        params.put("robotid", robot.getId());
        if(StringUtils.isNullOrEmpty(robot.getCurrentstate())){
            params.put("currentstate",Constant.ROBOT_STATE0);
        }else if(robot.getCurrentstate().equals(robot.getState1())){
            params.put("currentstate",Constant.ROBOT_STATE1);
        }else if(robot.getCurrentstate().equals(robot.getState2())){
            params.put("currentstate",Constant.ROBOT_STATE2);
        }else if(robot.getCurrentstate().equals(robot.getState3())){
            params.put("currentstate",Constant.ROBOT_STATE3);
        }else if(robot.getCurrentstate().equals(robot.getState4())){
            params.put("currentstate",Constant.ROBOT_STATE4);
        }else if(robot.getCurrentstate().equals(robot.getState5())){
            params.put("currentstate",Constant.ROBOT_STATE5);
        }else if(robot.getCurrentstate().equals(robot.getState6())){
            params.put("currentstate",Constant.ROBOT_STATE6);
        }else{
            params.put("currentstate",Constant.ROBOT_STATE0);
        }
        waybillMapper.updateRobotInfo(params);
        Logistics logistics = null;
        for(Waybill waybill : waybillList){
            if(StringUtils.isNullOrEmpty(robot.getCurrentstate())){
                continue;
            }
            logistics = new Logistics();
            logistics.setDatetime(new Date());
            logistics.setCreatedate(new Date());
            logistics.setInfo(robot.getCurrentstate());
            logistics.setLogo(Constant.LOGISTICS_LOGO_AUTO);
            logistics.setOrigin(Constant.LOGISTICS_ORIGIN_AUTO);
            logistics.setId(CommonUtil.uuid());
            logistics.setWaybillid(waybill.getId());
            logistics.setManagerid(robot.getManagerid());
            logistics.setDeleted(1);
            logisticsMapper.insertSelective(logistics);
        }
    }

    /**
     * 根据机器人自动更新运单信息和物流状态
     * @param robot
     */
    @Override
    public boolean autoHandleWaybill(Robot robot) throws IOException {
        String regex = CommonUtil.getPropertiesValue("config.properties","batchcodeRegex");
        Map<String,Object> params = new HashMap<String, Object>();
        List<Waybill> waybillList = new ArrayList<Waybill>();
        Waybill temp = null;
        if(robot.getBatchcode().matches(regex)){
            params.put("batchcode",robot.getBatchcode());
            params.put("isautoupdate",Constant.ROBOT_AUTO_TRUE);
            waybillList = waybillMapper.findByBatchCode(params);
        }else{
            params.put("code",robot.getBatchcode());
            params.put("isautoupdate",Constant.ROBOT_AUTO_TRUE);
            temp = waybillMapper.findByCode(params);
            if(null != temp){
                waybillList.add(temp);
            }
        }

        Logistics logistics = null;
        int currentState = 0;
        Waybill updateTemp = null;
        if(waybillList.size()<=0){
            return true;
        }
        for(Waybill waybill : waybillList){
            updateTemp= new Waybill();
            updateTemp.setId(waybill.getId());
            currentState = waybill.getCurrentstate();
            if(currentState>=6){
                updateTemp.setIsautoupdate(Constant.ROBOT_AUTO_FALSE);
            }else {
                logistics = new Logistics();
                currentState++;
                switch (currentState){
                    case Constant.ROBOT_STATE1:
                        if(!StringUtils.isNullOrEmpty(robot.getState1())){
                            logistics.setInfo(robot.getState1());
                        }
                        break;
                    case Constant.ROBOT_STATE2:
                        if(!StringUtils.isNullOrEmpty(robot.getState2())){
                            logistics.setInfo(robot.getState2());
                        }
                        break;
                    case Constant.ROBOT_STATE3:
                        if(!StringUtils.isNullOrEmpty(robot.getState3())){
                            logistics.setInfo(robot.getState3());
                        }
                        break;
                    case Constant.ROBOT_STATE4:
                        if(!StringUtils.isNullOrEmpty(robot.getState4())){
                            logistics.setInfo(robot.getState4());
                        }
                        break;
                    case Constant.ROBOT_STATE5:
                        if(!StringUtils.isNullOrEmpty(robot.getState5())){
                            logistics.setInfo(robot.getState5());
                        }
                        break;
                    case Constant.ROBOT_STATE6:
                        if(!StringUtils.isNullOrEmpty(robot.getState6())){
                            logistics.setInfo(robot.getState6());
                        }
                        break;
                }
                if(StringUtils.isNullOrEmpty(logistics.getInfo())){
                    updateTemp.setIsautoupdate(Constant.ROBOT_AUTO_FALSE);
                }else{
                    logistics.setDatetime(new Date());
                    logistics.setCreatedate(new Date());
                    logistics.setLogo(Constant.LOGISTICS_LOGO_AUTO);
                    logistics.setOrigin(Constant.LOGISTICS_ORIGIN_AUTO);
                    logistics.setId(CommonUtil.uuid());
                    logistics.setWaybillid(waybill.getId());
                    logistics.setManagerid(robot.getManagerid());
                    logistics.setDeleted(1);
                    logisticsMapper.insertSelective(logistics);
                    updateTemp.setCurrentstate(currentState);
                }
            }
            waybillMapper.updateByPrimaryKeySelective(updateTemp);
        }
        return false;
    }
}

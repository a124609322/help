package com.help.service.impl;

import com.chuandu.constant.Constant;
import com.chuandu.dao.LogisticsMapper;
import com.chuandu.dao.WaybillMapper;
import com.chuandu.model.Logistics;
import com.chuandu.model.Waybill;
import com.chuandu.service.WaybillServcie;
import com.chuandu.util.BaiduExpressUtil;
import com.chuandu.util.CommonUtil;
import com.chuandu.util.ExcelUtil;
import com.chuandu.vo.Pager;
import com.google.gson.Gson;
import com.mysql.jdbc.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.annotation.Resource;
import javax.xml.transform.Templates;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.*;

/**
 * Created by Administrator on 2016/3/28.
 */
@Service
public class WaybillServiceImpl extends BaseService implements WaybillServcie {

    @Resource
    private WaybillMapper waybillMapper;

    @Resource
    private LogisticsMapper logisticsMapper;

    @Override
    public List<Waybill> selectPager(Pager pager) {
        int count = waybillMapper.selectPagerForCount(pager);
        pager.setTotal(count);
        return waybillMapper.selectPager(pager);
    }

    @Override
    public boolean save(Waybill waybill) {
        Map<String,Object> param = new HashMap<String, Object>();
        param.put("code",waybill.getCode());
        Waybill temp = waybillMapper.findByCode(param);
        if (null != temp) {
            return true;
        }
        waybill.setId(CommonUtil.uuid());
        waybill.setCreatedate(new Date());
        waybill.setDeleted(1);
        waybill.setCurrentstate(Constant.ROBOT_STATE0);
        waybillMapper.insert(waybill);
        return false;
    }

    @Override
    public boolean deleteList(String[] idList, int deleted) {
        Waybill waybill = null;
        Waybill temp = null;
        Map<String,Object> param = new HashMap<String, Object>();
        for (String id : idList) {
            if(deleted  == 1){
                waybill = waybillMapper.selectByPrimaryKey(id);
                param.put("code",waybill.getCode());
                temp = waybillMapper.findByCode(param);
                if(null != temp){
                    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                    return false;
                }
            }
            waybillMapper.setDeleteByPrimaryKey(id, deleted);
        }
        return true;
    }

    @Override
    public void updateWaybill(Waybill waybill) {
        Waybill temp = waybillMapper.selectByPrimaryKey(waybill.getId());
        waybill.setModifydate(new Date());
        waybill.setCreatedate(temp.getCreatedate());
        waybill.setManagerid(temp.getManagerid());
        waybill.setDeleted(temp.getDeleted());
        waybillMapper.updateByPrimaryKeySelective(waybill);
    }

    @Override
    public void deletedList(String[] idList) {
        for (String id : idList) {
            logisticsMapper.deleteByWaybillKey(id);
            waybillMapper.deleteByPrimaryKey(id);
        }
    }

    @Override
    public void deleteAll() {
        waybillMapper.clearup();
    }

    public Map<String, Object> importwaybill(InputStream inputStream, String id) throws IOException, InvalidFormatException {
        Map<String, Object> result = new HashMap<String, Object>();
        String[] titleValid = CommonUtil.getPropertiesValue("excel.properties", "importwaybill").split(" ");
        String[][] content = ExcelUtil.readExcel(inputStream);
        String[] titleArray = content[0];
        Map<String,Integer> waybillMap = new HashMap<String, Integer>();
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
        Waybill waybill = null;
        Waybill validWaybill = null;
        String[] row;
        String cell;
        String msg = "操作成功#条数据！<br/>";
        Integer validint = null;
        int count = 0;
        row:
        for (int i = 1; i < content.length; i++) {
            waybill = new Waybill();
            row = content[i];
            for (int j = 0; j < row.length; j++) {
                cell = row[j];
                if (StringUtils.isNullOrEmpty(cell)) {
                    msg += ("Excel第" + (i + 1) + "行第" + (j + 1) + "列为空，请重新上传~！<br/>");
                    continue row;
                } else {
                    switch (j) {
                        case Constant.IMPORTWAYBILL_CODE:
                            validint = waybillMap.get(cell);
                            if(null != validint){
                                msg +=("Excel第" + (i + 1)  + "行" + cell +"运单号与第"+validint+"行运单号重复，请重新上传第"+ (i + 1)+"行数据~！<br/>");
                                continue row;
                            }
                            waybill.setCode(CommonUtil.handlerExcelDouble(cell));
                            Map<String,Object> param = new HashMap<String, Object>();
                            param.put("code", waybill.getCode());
                            validWaybill = waybillMapper.findByCode(param);
                            if (null != validWaybill) {
                                msg +=("Excel第" + (i + 1)  + "行" + cell +"运单号重复，请重新上传~！<br/>");
                                continue row;
                            }
                            break;
                        case Constant.IMPORTWAYBILL_BATCHCODE:
                            if(cell.matches(CommonUtil.getPropertiesValue("config.properties","batchcodeRegex"))){
                                waybill.setBatchcode(cell);
                                break;
                            } else{
                                msg += ("Excel第" + (i + 1) + "行" +cell+ "批次号不符合规范，请重新上传~！<br/>");
                                continue row;
                            }

                    }
                }
            }
            waybill.setId(CommonUtil.uuid());
            waybill.setManagerid(id);
            waybill.setCreatedate(new Date());
            waybill.setDeleted(1);
            waybill.setProblem(Constant.PROBLEM_FALSE);
            waybill.setCurrentstate(Constant.ROBOT_STATE0);
            waybillMapper.insertSelective(waybill);
            waybillMap.put(waybill.getCode(), (i+1));
            count++;
        }
        result.put("success", true);
        result.put("msg",msg.replace("#",String.valueOf(count)));
        return result;
    }

    @Override
    public Map<String, Object> importinfo(InputStream inputStream) throws IOException, InvalidFormatException {
        Map<String, Object> result = new HashMap<String, Object>();
        String[] titleValid = CommonUtil.getPropertiesValue("excel.properties", "importinfo").split(" ");
        String[][] content = ExcelUtil.readExcel(inputStream);
        String[] titleArray = content[0];
        String msg = "导入成功#条数据~！";
        Waybill validObj = null;
        if (titleValid.length != titleArray.length) {
            result.put("success", false);
            result.put("msg", "Excel标题格式不符合要求，请重新上传~！");
            return result;
        }
        for (int i = 0; i < titleValid.length; i++) {
            if (!titleValid[i].equals(titleArray[i].trim())) {
                result.put("success", false);
                result.put("msg", "Excel标题格式不符合要求，请重新上传~！");
                return result;
            }
        }
        Waybill waybill = null;
        String[] row;
        String cell;
        int count = 0;
        for (int i = 1; i < content.length; i++) {
            waybill = new Waybill();
            row = content[i];
            for (int j = 0; j < row.length; j++) {
                cell = row[j];
                if (StringUtils.isNullOrEmpty(cell)) {
                    continue;
                }
                switch (j) {
                    case Constant.IMPORTINF_CODE:
                        waybill.setCode(CommonUtil.handlerExcelDouble(cell));
                        break;
                    case Constant.IMPORTINF_EXPRESSCODE:
                        waybill.setExpresscode(cell);
                        break;
                    case Constant.IMPORTINF_NAME:
                        waybill.setName(cell);
                        break;
                    case Constant.IMPORTINF_PHONE:
                        waybill.setPhone(CommonUtil.handlerExcelDouble(cell));
                        break;
                    case Constant.IMPORTINF_ADDRESS:
                        waybill.setAddress(cell);
                        break;
                    case Constant.IMPORTINF_GOODS1:
                        waybill.setGoods1(cell);
                        break;
                    case Constant.IMPORTINF_AMOUNT1:
                        waybill.setAmount1(Integer.parseInt(CommonUtil.handlerExcelDouble(cell)));
                        break;
                    case Constant.IMPORTINF_PRICE1:
                        waybill.setPrice1(BigDecimal.valueOf(Double.parseDouble(cell)));
                        break;
                    case Constant.IMPORTINF_GOODS2:
                        waybill.setGoods2(cell);
                        break;
                    case Constant.IMPORTINF_AMOUNT2:
                        waybill.setAmount2(Integer.parseInt(CommonUtil.handlerExcelDouble(cell)));
                        break;
                    case Constant.IMPORTINF_PRICE2:
                        waybill.setPrice2(BigDecimal.valueOf(Double.parseDouble(cell)));
                        break;
                    case Constant.IMPORTINF_GOODS3:
                        waybill.setGoods3(cell);
                        break;
                    case Constant.IMPORTINF_AMOUNT3:
                        waybill.setAmount3(Integer.parseInt(CommonUtil.handlerExcelDouble(cell)));
                        break;
                    case Constant.IMPORTINF_PRICE3:
                        waybill.setPrice3(BigDecimal.valueOf(Double.parseDouble(cell)));
                        break;
                    case Constant.IMPORTINF_WORTH:
                        waybill.setWorth(BigDecimal.valueOf(Double.parseDouble(cell)));
                        break;
                    case Constant.IMPORTINF_WEIGHT:
                        waybill.setWeight(BigDecimal.valueOf(Double.parseDouble(cell)));
                        break;
                    case Constant.IMPORTINF_INSURANCE:
                        waybill.setInsurance(BigDecimal.valueOf(Double.parseDouble(cell)));
                        break;
                    case Constant.IMPORTINF_SENDER:
                        waybill.setSender(cell);
                        break;
                    case Constant.IMPORTINF_CHANNEL:
                        waybill.setChannel(cell);
                        break;
                    case Constant.IMPORTINF_EXPRESSCOMPANY:
                        waybill.setExpresscompany(cell);
                        break;
                }
            }
            BigDecimal worth = new BigDecimal(0);
            if(null != waybill.getPrice1() && null != waybill.getAmount1()){
                worth = worth.add(waybill.getPrice1().multiply(BigDecimal.valueOf(waybill.getAmount1())));
            }
            if(null != waybill.getPrice2() && null != waybill.getAmount2()){
                worth = worth.add(waybill.getPrice2().multiply(BigDecimal.valueOf(waybill.getAmount2())));
            }
            if(null != waybill.getPrice3() && null != waybill.getAmount3()){
                worth = worth.add(waybill.getPrice3().multiply(BigDecimal.valueOf(waybill.getAmount3())));
            }
            waybill.setWorth(worth);
            waybill.setModifydate(new Date());
            result.put("code",waybill.getCode());
            validObj = waybillMapper.findByCode(result);
            if(null == validObj){
                msg  += "<br/>第"+i+"行Code:"+waybill.getCode()+"不存在";
            }else{
                waybillMapper.updateByCode(waybill);
                count++;
            }
        }
        result.put("success", true);
        result.put("msg", msg.replace("#",String.valueOf(count)));
        return result;
    }

    @Override
    public Map<String, Object> importproblem(InputStream inputStream) throws IOException, InvalidFormatException {
        Map<String, Object> result = new HashMap<String, Object>();
        String[] titleValid = CommonUtil.getPropertiesValue("excel.properties", "importproblem").split(" ");
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
        Waybill waybill = null;
        String[] row;
        String cell;
        for (int i = 1; i < content.length; i++) {
            waybill = new Waybill();
            row = content[i];
            for (int j = 0; j < row.length; j++) {
                cell = row[j];
                if (StringUtils.isNullOrEmpty(cell) && j == Constant.IMPORTPROBLEM_CODE) {
                    result.put("success", false);
                    result.put("msg", "Excel第" + (i + 1) + "行单号为空，请重新上传~！");
                    TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                    return result;
                } else {
                    if (StringUtils.isNullOrEmpty(cell)){
                        continue;
                    }
                    switch (j) {
                        case Constant.IMPORTPROBLEM_CODE:
                            waybill.setCode(CommonUtil.handlerExcelDouble(cell));
                            break;
                        case Constant.IMPORTPROBLEM_PROBLEMREASON:
                            waybill.setProblemreason(cell);
                            break;
                        case Constant.IMPORTPROBLEM_BATCHCODE:
                            waybill.setBatchcode(cell);
                            break;
                    }
                }
            }
            waybill.setModifydate(new Date());
            waybill.setProblem(Constant.PROBLEM_TRUE);
            waybillMapper.updateByCode(waybill);
        }
        result.put("success", true);
        result.put("msg", "导入成功~！");
        return result;
    }

    @Override
    public Waybill selectByCode(String code) throws ParseException {
        Map<String,Object> param = new HashMap<String, Object>();
        param.put("code",code);
        Waybill waybill = waybillMapper.findByCode(param);
        if(null != waybill && waybill.getIsautoupdate() != Constant.ROBOT_AUTO_TRUE){
            String params = "type="+waybill.getExpresscompany()+"&number="+waybill.getExpresscode();
            String result = BaiduExpressUtil.requestLogiscs(params);
            Gson gson = new Gson();
            HashMap<String,Object> re = gson.fromJson(result, HashMap.class);
            List<Logistics> logisticsList =  new ArrayList<Logistics>();
            List<Logistics> temp = waybill.getLogisticsList();
            Logistics lo = null;
            if(re.get("status").equals("0")) {
                List<Map> list = (List<Map>)(((Map)re.get("result")).get("list"));
                if(((Map)re.get("result")).get("issign").equals("1")){
                    waybill.setIsEnd(Constant.WAYBILL_END_TRUE);
                }else{
                    waybill.setIsEnd(Constant.WAYBILL_END_FALASE);
                }
                for(Map<String,Object> h : list){
                    lo = new Logistics();
                    lo.setDatetime(Constant.SIMPLEDATEFORMAT.parse((String) h.get("time")));
                    lo.setInfo((String) h.get("status"));
                    if(lo.getInfo().indexOf(Constant.WAYBILL_END) > 0){
                        lo.setLogo(Constant.LOGISTICS_LOGO_SIGN);
                        waybill.setEndtime(lo.getDatetime());
                    }else{
                        lo.setLogo(Constant.LOGISTICS_LOGO_API);
                    }
                    logisticsList.add(lo);
                }
                if(null != temp){
                    logisticsList.addAll(temp);
                }
                waybill.setLogisticsList(logisticsList);
            }
        }
        return waybill;
    }
}

package com.help.controller.admin;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.interval.Interval;
import com.chuandu.model.*;
import com.chuandu.service.LogisticsServcie;
import com.chuandu.service.ManagerServcie;
import com.chuandu.util.CommonUtil;
import com.chuandu.vo.Pager;
import com.mysql.jdbc.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller
@RequestMapping("/admin/logistics")
public class LogisticsController extends BaseController {

    private Logger logger = Logger.getLogger(LogisticsController.class);

    @Autowired
    private LogisticsServcie logisticsServcie;


    @Autowired
    private Interval robotInterval;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model list(Pager pager,Model model,String code){
        List<Logistics> logisticsList = null;
        HashMap<String,Object> data = new HashMap<String, Object>();
        pager.setDataMap(data);
        if(!StringUtils.isNullOrEmpty(code)) {
            data.put("code",code);
        }
        try {
            logisticsList = logisticsServcie.selectPager(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("logisticsList",logisticsList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }


    @RequestMapping(value="/add",method = RequestMethod.POST)
    public Model add(Logistics logistics,Model model,HttpSession session,String batchCode){
        success = true;
        msg = "保存成功！";
        Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
        logistics.setManagerid(manager.getId());
        boolean codeValid = false;
        try {
            codeValid = logisticsServcie.save(logistics);
            if(codeValid){
                success = true;
            }else{
                success = false;
                msg = "订单号不存在，请重新输入！";
            }

        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value="/modify",method = RequestMethod.POST)
    public Model modify(Logistics logistics,Model model){
        success = true;
        msg = "保存成功！";
        try {
            logisticsServcie.update(logistics);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value="/delete",method = RequestMethod.POST)
    public Model delete(String[] idList,Model model){
        boolean success = true;
        try {
            logisticsServcie.deleteList(idList);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
        }
        model.addAttribute("success",success);
        return model;
    }

    @RequestMapping(value = "/batchupdate", method = RequestMethod.POST)
    public Model batchupdate(Model model, HttpSession session, MultipartFile file) {
        success = true;
        msg = "保存成功！";
        Map<String, Object> result = null;
        Manager manager = (Manager) session.getAttribute(Constant.SESSION_KEY);
        try {
            result = logisticsServcie.batchupdate(file.getInputStream(),manager.getId());
            if(null != result.get("robotList") && ((List)result.get("robotList")).size() >0){
                robotInterval.handleWayBill((List<Robot>)result.get("robotList"));
            }
            msg = (String) result.get("msg");
            success = (Boolean) result.get("success");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success", success);
        model.addAttribute("msg", msg);
        return model;
    }
}

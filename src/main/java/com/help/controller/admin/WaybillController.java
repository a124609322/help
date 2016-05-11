package com.help.controller.admin;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Link;
import com.chuandu.model.Logistics;
import com.chuandu.model.Manager;
import com.chuandu.model.Waybill;
import com.chuandu.service.WaybillServcie;
import com.chuandu.util.CommonUtil;
import com.chuandu.util.ExcelUtil;
import com.chuandu.vo.Pager;
import com.mysql.jdbc.StringUtils;
import org.apache.log4j.Logger;
import org.hamcrest.core.IsNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller
@RequestMapping("/admin/waybill")
public class WaybillController extends BaseController {

    private Logger logger = Logger.getLogger(WaybillController.class);

    @Autowired
    private WaybillServcie waybillServcie;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Model list(Waybill waybill, Pager pager, Model model, boolean problemtrue, boolean problemfalse, String starttime, String lasttime) throws ParseException {
        pager.setDataMap(new HashMap<String, Object>());
        pager.getDataMap().put("deleted", waybill.getDeleted());
        pager.getDataMap().put("code", waybill.getCode());
        pager.getDataMap().put("batchcode", waybill.getBatchcode());
        pager.getDataMap().put("name", waybill.getName());
        pager.getDataMap().put("phone", waybill.getPhone());
        pager.getDataMap().put("expresscode", waybill.getExpresscode());
        pager.getDataMap().put("sender", waybill.getSender());
        if (!StringUtils.isNullOrEmpty(starttime) && !StringUtils.isNullOrEmpty(lasttime)) {
            starttime = starttime.replace("T", " ");
            lasttime = lasttime.replace("T", " ");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            pager.getDataMap().put("starttime", sdf.parse(starttime));
            pager.getDataMap().put("endtime", sdf.parse(lasttime));
        }
        if (problemtrue) {
            pager.getDataMap().put("problem", Constant.PROBLEM_TRUE);
        } else if (problemfalse) {
            pager.getDataMap().put("problem", Constant.PROBLEM_FALSE);
        }
        List<Waybill> waybillList = null;
        try {
            waybillList = waybillServcie.selectPager(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        model.addAttribute("waybillList", waybillList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Model add(Waybill waybill, Model model, HttpSession session) {
        success = true;
        msg = "保存成功！";
        boolean isRepeat = true;
        Manager manager = (Manager) session.getAttribute(Constant.SESSION_KEY);
        waybill.setManagerid(manager.getId());
        try {

            isRepeat = waybillServcie.save(waybill);
            if (isRepeat) {
                msg = "运单号重复，请重新添加！";
            }
            success = true;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success", success);
        model.addAttribute("isRepeat", isRepeat);
        model.addAttribute("msg", msg);
        return model;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Model deleteWaybill(String[] idList, Model model) {
        boolean success = true;
        try {
            waybillServcie.deleteList(idList, 0);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            success = false;
        }
        model.addAttribute("success", success);
        return model;
    }

    @RequestMapping(value = "/deleted", method = RequestMethod.POST)
    public Model deletedWaybill(String[] idList, Model model) {
        boolean success = true;
        try {
            waybillServcie.deletedList(idList);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            success = false;
        }
        model.addAttribute("success", success);
        return model;
    }

    @RequestMapping(value = "/clearup", method = RequestMethod.POST)
    public Model clearup(Model model) {
        boolean success = true;
        try {
            waybillServcie.deleteAll();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            success = false;
        }
        model.addAttribute("success", success);
        return model;
    }

    @RequestMapping(value = "/modify", method = RequestMethod.POST)
    public Model modify(Waybill waybill, Model model) {
        success = true;
        msg = "保存成功！";
        try {
            waybillServcie.updateWaybill(waybill);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success", success);
        model.addAttribute("msg", msg);
        return model;
    }

    @RequestMapping(value = "/restore", method = RequestMethod.POST)
    public Model restoreWaybill(String[] idList, Model model) {
        success = true;
        msg = "还原成功~！";
        try {
            success = waybillServcie.deleteList(idList, 1);
            if(!success){
                msg = "还原的数据中存在相同的订单号或者运单库里已经存在相同的运单号！";
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            success = false;
        }
        model.addAttribute("success", success);
        model.addAttribute("msg", msg);
        return model;
    }

    @RequestMapping(value = "/importwaybill", method = RequestMethod.POST)
    public Model importwaybill(Model model, HttpSession session, MultipartFile file) {
        success = true;
        msg = "保存成功！";
        Manager manager = (Manager) session.getAttribute(Constant.SESSION_KEY);
        Map<String, Object> result = null;
        try {
            result = waybillServcie.importwaybill(file.getInputStream(), manager.getId());
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

    @RequestMapping(value = "/importinfo", method = RequestMethod.POST)
    public Model importinfo(Model model, HttpSession session, MultipartFile file) {
        success = true;
        msg = "保存成功！";
        Map<String, Object> result = null;
        try {
            result = waybillServcie.importinfo(file.getInputStream());
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

    @RequestMapping(value = "/importproblem", method = RequestMethod.POST)
    public Model importproblem(Model model, HttpSession session, MultipartFile file) {
        success = true;
        msg = "保存成功！";
        Map<String, Object> result = null;
        try {
            result = waybillServcie.importproblem(file.getInputStream());
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

    @RequestMapping(value = "/exportExcel", method = RequestMethod.GET)
    public void exportExcel(Waybill waybill, Model model, boolean problemtrue, boolean problemfalse, String starttime, String endtime, HttpServletResponse response) throws ParseException {
        Pager pager = new Pager();
        pager.setLimit(999999999);
        pager.setStart(0);
        pager.setDataMap(new HashMap<String, Object>());
        pager.getDataMap().put("deleted", waybill.getDeleted());
        pager.getDataMap().put("code", waybill.getCode());
        pager.getDataMap().put("batchcode", waybill.getBatchcode());
        pager.getDataMap().put("name", waybill.getName());
        pager.getDataMap().put("phone", waybill.getPhone());
        pager.getDataMap().put("expresscode", waybill.getExpresscode());
        pager.getDataMap().put("sender", waybill.getSender());
        if (!StringUtils.isNullOrEmpty(starttime) && !StringUtils.isNullOrEmpty(endtime)) {
            starttime = starttime.replace("T", " ");
            endtime = endtime.replace("T", " ");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            pager.getDataMap().put("starttime", sdf.parse(starttime));
            pager.getDataMap().put("endtime", sdf.parse(endtime));
        }
        if (problemtrue) {
            pager.getDataMap().put("problem", Constant.PROBLEM_TRUE);
        } else if (problemfalse) {
            pager.getDataMap().put("problem", Constant.PROBLEM_FALSE);
        }
        List<Waybill> waybillList = null;
        success = true;
        msg = "导出成功！";
        try {
            waybillList = waybillServcie.selectPager(pager);
            if (null == waybillList && waybillList.size() <= 0) {
                waybillList = new ArrayList<Waybill>();
            }
            String[][] data = handleData(waybillList);
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;filename=waybill.xlsx");
            OutputStream ouputStream = response.getOutputStream();
            ExcelUtil.exportExcel(data, ouputStream);
            ouputStream.flush();
            ouputStream.close();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }


    private String[][] handleData(List<Waybill> waybillList) throws IOException {
        String headText = CommonUtil.getPropertiesValue("excel.properties", "exportwaybill");
        String[] headArray = headText.split(" ");
        String[][] result = new String[waybillList.size() + 1][headArray.length];
        Waybill waybill = null;
        List<Logistics> logisticsList = null;
        Logistics logistics = null;
        for (int i = 0; i < result.length; i++) {
            if (i == 0) {
                for (int j = 0; j < result[i].length; j++) {
                    result[i][j] = headArray[j];
                }
                continue;
            }
            waybill = waybillList.get(i-1);
            logisticsList = waybill.getLogisticsList();
            if (null != logisticsList && logisticsList.size() > 0) {
                logistics = logisticsList.get(0);
            }
            for (int j = 0; j < result[i].length; j++) {
                switch (j) {
                    case Constant.EXPORT_WAYBILL_CODE:
                        result[i][j] = isNull(waybill.getCode());
                        break;
                    case Constant.EXPORT_WAYBILL_EXPRESSCODE:
                        result[i][j] = isNull(waybill.getExpresscode());
                        break;
                    case Constant.EXPORT_WAYBILL_EXPRESSCOMPANY:
                        result[i][j] = isNull(waybill.getExpresscompany());
                        break;
                    case Constant.EXPORT_WAYBILL_BATCHCODE:
                        result[i][j] = isNull(waybill.getBatchcode());
                        break;
                    case Constant.EXPORT_WAYBILL_CHANNEL:
                        result[i][j] = isNull(waybill.getChannel());
                        break;
                    case Constant.EXPORT_WAYBILL_SENDER:
                        result[i][j] = isNull(waybill.getSender());
                        break;
                    case Constant.EXPORT_WAYBILL_STATUES:
                        result[i][j] = isNull(null != logistics ? logistics.getInfo() : "");
                        break;
                    case Constant.EXPORT_WAYBILL_CREATEDATE:
                        result[i][j] = isNull(Constant.SIMPLEDATEFORMAT.format(waybill.getCreatedate()));
                        break;
                    case Constant.EXPORT_WAYBILL_UPDATEDATE:
                        result[i][j] = isNull(null != logistics ? Constant.SIMPLEDATEFORMAT.format(logistics.getDatetime()) : "");
                        break;
                    case Constant.EXPORT_WAYBILL_PROBLEM:
                        result[i][j] = waybill.getProblem() == 1 ? "Yes" : "No";
                        break;
                    case Constant.EXPORT_WAYBILL_PROBLEMREASON:
                        result[i][j] = isNull(waybill.getProblemreason());
                        break;
                    case Constant.EXPORT_WAYBILL_NAME:
                        result[i][j] = isNull(waybill.getName());
                        break;
                    case Constant.EXPORT_WAYBILL_PHONE:
                        result[i][j] = isNull(waybill.getPhone());
                        break;
                    case Constant.EXPORT_WAYBILL_ADDS:
                        result[i][j] = isNull(waybill.getAddress());
                        break;
                    case Constant.EXPORT_WAYBILL_GOODS1:
                        result[i][j] = isNull(waybill.getGoods1());
                        break;
                    case Constant.EXPORT_WAYBILL_AMOUNT1:
                        result[i][j] = isNull(waybill.getAmount1());
                        break;
                    case Constant.EXPORT_WAYBILL_PRICE1:
                        result[i][j] = isNull(waybill.getPrice1());
                        break;
                    case Constant.EXPORT_WAYBILL_GOODS2:
                        result[i][j] = isNull(waybill.getGoods2());
                        break;
                    case Constant.EXPORT_WAYBILL_AMOUNT2:
                        result[i][j] = isNull(waybill.getAmount2());
                        break;
                    case Constant.EXPORT_WAYBILL_PRICE2:
                        result[i][j] = isNull(waybill.getPrice2());
                        break;
                    case Constant.EXPORT_WAYBILL_GOODS3:
                        result[i][j] = isNull(waybill.getGoods3());
                        break;
                    case Constant.EXPORT_WAYBILL_AMOUNT3:
                        result[i][j] = isNull(waybill.getAmount3());
                        break;
                    case Constant.EXPORT_WAYBILL_PRICE3:
                        result[i][j] = isNull(waybill.getPrice3());
                        break;
                    case Constant.EXPORT_WAYBILL_WORTH:
                        result[i][j] = isNull(waybill.getWorth());
                        break;
                    case Constant.EXPORT_WAYBILL_WEIGHT:
                        result[i][j] = isNull(waybill.getWeight());
                        break;
                    case Constant.EXPORT_WAYBILL_INSURANCE:
                        result[i][j] = isNull(waybill.getInsurance());
                        break;
                }
            }
        }
        return result;
    }

    private String isNull(String data) {
        if (null == data) {
            return "";
        }
        return data;
    }

    private String isNull(Integer data) {
        if (null == data) {
            return "";
        }
        return String.valueOf(data);
    }

    private String isNull(BigDecimal data) {
        if (null == data) {
            return "";
        }
        return String.valueOf(data.doubleValue());
    }
}

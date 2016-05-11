package com.help.controller.web;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Manager;
import com.chuandu.model.Notice;
import com.chuandu.service.NoticeServcie;
import com.chuandu.vo.Pager;
import com.mysql.jdbc.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller("webNoticeController")
@RequestMapping("/notice")
public class NoticeController extends BaseController {

    private Logger logger = Logger.getLogger(NoticeController.class);

    @Autowired
    private NoticeServcie noticeServcie;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model list(Pager pager,Model model,Notice notice){
        List<Notice> noticeList = null;
        HashMap<String,Object> data = new HashMap<String, Object>();
        pager.setDataMap(data);
        if(null != notice) {
            data.put("isRoll",notice.getIsRoll());
        }
        try {
            noticeList = noticeServcie.selectPager(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("noticeList",noticeList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }

    @RequestMapping(value = "/view",method = RequestMethod.GET)
    public String view(Model model,Notice notice){
        Notice result = null;
        try {
            result = noticeServcie.select(notice);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("notice",result);
        return "/info";
    }

    @RequestMapping(value = "/listAll",method = RequestMethod.GET)
    public Model listAll(Model model){
        List<Notice> noticeList = null;
        try {
            noticeList = noticeServcie.selectAll();
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("noticeList",noticeList);
        return model;
    }


}

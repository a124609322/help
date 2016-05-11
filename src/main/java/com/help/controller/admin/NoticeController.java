package com.help.controller.admin;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Manager;
import com.chuandu.model.Notice;
import com.chuandu.service.NoticeServcie;
import com.chuandu.vo.Pager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller
@RequestMapping("/admin/notice")
public class NoticeController extends BaseController {

    private Logger logger = Logger.getLogger(NoticeController.class);

    @Autowired
    private NoticeServcie noticeServcie;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model list(Pager pager,Model model){
        List<Notice> noticeList = null;
        try {
            pager.setDataMap(new HashMap<String,Object>());
            noticeList = noticeServcie.selectPager(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("noticeList",noticeList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }

    @RequestMapping(value="/add",method = RequestMethod.POST)
    public Model add(Notice notice,Model model,HttpSession session){
        success = true;
        msg = "保存成功！";
        Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
        notice.setManagerid(manager.getId());
        boolean valid = false;
        try {
            valid = noticeServcie.save(notice);
            if(valid){
                success = true;
            }else{
                success = false;
                msg="该类型公告只能存在一个，并且已经存在，请重新添加~！";
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
    public Model modify(Notice notice,Model model,String contentData){
        success = true;
        msg = "保存成功！";
        boolean valid = false;
        try {
            notice.setContent(contentData);
            valid = noticeServcie.update(notice);
            if(valid){
                success = true;
            }else{
                success = false;
                msg="该类型公告只能存在一个，并且已经存在，请重新修改~！";
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

    @RequestMapping(value="/delete",method = RequestMethod.POST)
    public Model delete(String[] idList,Model model){
        boolean success = true;
        try {
            noticeServcie.deleteList(idList);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
        }
        model.addAttribute("success",success);
        return model;
    }
    @RequestMapping(value="/top",method = RequestMethod.POST)
    public Model top(Notice notice,Model model){
        success = true;
        msg = "保存成功！";
        try {
            noticeServcie.updateTop(notice);
            success = true;
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value="/roll",method = RequestMethod.POST)
    public Model roll(Notice notice,Model model){
        success = true;
        msg = "保存成功！";
        boolean valid = false;
        try {
            valid = noticeServcie.updateRoll(notice);
            if(valid){
                success = true;
            }else{
                success = false;
                msg="滚动公告最多5条，请重新修改~！";
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
}

package com.help.controller.web;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Link;
import com.chuandu.model.Manager;
import com.chuandu.service.LinkServcie;
import com.chuandu.util.CommonUtil;
import com.chuandu.vo.Pager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller("webLinkController")
@RequestMapping("/link")
public class LinkController extends BaseController {

    private Logger logger = Logger.getLogger(LinkController.class);

    @Autowired
    private LinkServcie linkServcie;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model List(Model model){
        List<Link> linkList = null;
        try {
            linkList = linkServcie.selectAll();
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("linkList",linkList);
        return model;
    }
}

package com.help.controller.web;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Banner;
import com.chuandu.model.Manager;
import com.chuandu.service.BannerServcie;
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
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller("webBannerController")
@RequestMapping("/banner")
public class BannerController extends BaseController {

    private Logger logger = Logger.getLogger(BannerController.class);

    @Autowired
    private BannerServcie bannerServcie;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model list(Model model){
        List<Banner> bannerList = null;
        try {
            bannerList = bannerServcie.selectAll(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("bannerList",bannerList);
        return model;
    }
}

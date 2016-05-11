package com.help.controller.admin;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Banner;
import com.chuandu.model.Manager;
import com.chuandu.service.BannerServcie;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller
@RequestMapping("/admin/banner")
public class BannerController extends BaseController {

    private Logger logger = Logger.getLogger(BannerController.class);

    @Autowired
    private BannerServcie bannerServcie;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model list(Pager pager,Model model){
        List<Banner> bannerList = null;
        try {
            bannerList = bannerServcie.selectPager(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("bannerList",bannerList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }


    @RequestMapping(value="/add",method = RequestMethod.POST)
    public Model add(Banner banner,Model model,HttpSession session,MultipartFile file){
        success = true;
        msg = "保存成功！";
        Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
        banner.setManagerid(manager.getId());
        try {
            banner.setId(CommonUtil.uuid());
            String pics = CommonUtil.copySingleFile(banner.getId(), file, Constant.BANNER_PATH);
            banner.setUrl(pics);
            bannerServcie.save(banner);
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

    @RequestMapping(value="/modify",method = RequestMethod.POST)
    public Model modify(Banner banner,Model model,MultipartFile file){
        success = true;
        msg = "保存成功！";
        try {
            if(null != file.getOriginalFilename() && !"".equals(file.getOriginalFilename())){
                //先保存文件
                String pics = CommonUtil.copySingleFile(banner.getId(), file,Constant.BANNER_PATH);
                Banner temp  = bannerServcie.findById(banner.getId());
                String oldPic = temp.getUrl();
                //先保存数据
                banner.setUrl(pics);
                bannerServcie.update(banner);
                //后删除文件
                CommonUtil.delteSingleFile(oldPic);
            }
            else{
                bannerServcie.update(banner);
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
            bannerServcie.deleteList(idList);
            for (String id : idList){
                CommonUtil.delteSingleFile(CommonUtil.getPropertiesValue(Constant.PROPERTIES_NAME,Constant.BANNER_PATH)+id);
            }
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
        }
        model.addAttribute("success",success);
        return model;
    }
}

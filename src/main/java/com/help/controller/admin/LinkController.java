package com.help.controller.admin;

import com.chuandu.constant.Constant;
import com.chuandu.controller.BaseController;
import com.chuandu.model.Banner;
import com.chuandu.model.Link;
import com.chuandu.model.Manager;
import com.chuandu.service.LinkServcie;
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
import java.io.IOException;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Controller
@RequestMapping("/admin/link")
public class LinkController extends BaseController {

    private Logger logger = Logger.getLogger(LinkController.class);

    @Autowired
    private LinkServcie linkServcie;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public Model List(Pager pager,Model model){
        List<Link> linkList = null;
        try {
            linkList = linkServcie.selectPager(pager);
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        }
        model.addAttribute("linkList",linkList);
        model.addAttribute("totalCount", pager.getTotal());
        return model;
    }


    @RequestMapping(value="/add",method = RequestMethod.POST)
    public Model add(Link link,Model model,HttpSession session,MultipartFile file){
        success = true;
        msg = "保存成功！";
        boolean isRepeat = true;
        Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
        link.setManagerid(manager.getId());
        try {
            link.setId(CommonUtil.uuid());
            String pics = CommonUtil.copySingleFile(link.getId(), file, Constant.LINK_PATH);
            link.setLogo(pics);
            linkServcie.save(link);
            success = true;
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
            msg = "保存失败！";
        }
        model.addAttribute("isRepeat",isRepeat);
        model.addAttribute("success",success);
        model.addAttribute("msg",msg);
        return model;
    }

    @RequestMapping(value="/modify",method = RequestMethod.POST)
    public Model modify(Link link,Model model,HttpSession session,MultipartFile file){
        success = true;
        msg = "保存成功！";
        Manager manager = (Manager)session.getAttribute(Constant.SESSION_KEY);
        link.setManagerid(manager.getId());
        try {
            if(null != file.getOriginalFilename() && !"".equals(file.getOriginalFilename())){
                //先保存文件
                String pics = CommonUtil.copySingleFile(link.getId(), file,Constant.LINK_PATH);
                Link temp  = linkServcie.findById(link.getId());
                String oldPic = temp.getLogo();
                //先保存数据
                link.setLogo(pics);
                linkServcie.update(link);
                //后删除文件
                CommonUtil.delteSingleFile(oldPic);
            }
            else{
                linkServcie.update(link);
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
            if(idList != null && idList.length > 0) {
                for(String id : idList){
                    try {
                        String prefix = CommonUtil.getPropertiesValue(Constant.PROPERTIES_NAME, Constant.LINK_PATH);
                        CommonUtil.delteSingleFile(prefix+"/"+id);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                linkServcie.deleteList(idList);
            } else {
                success = false;
            }
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
            success = false;
        }
        model.addAttribute("success",success);
        return model;
    }
}

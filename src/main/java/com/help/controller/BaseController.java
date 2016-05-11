package com.help.controller;


import com.chuandu.util.CommonUtil;
import com.chuandu.vo.Pager;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Created by Administrator on 2015/11/9.
 */
public class BaseController {

    protected Pager pager = new Pager();

    protected boolean success = false;

    protected String msg = "请求错误，请重试！";

    protected Map<String,Objects> result = new HashMap<String, Objects>();

}

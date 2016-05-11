package com.help.util;


import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;

/**
 * Created by Administrator on 2016/4/18.
 */
public class BaiduExpressUtil {

        private static Logger logger = Logger.getLogger(BaiduExpressUtil.class);

        private static final String httpUrlExpress = "http://apis.baidu.com/netpopo/express/express2";
        //String httpArg = "";
        private static final String httpUrlLogisics = "http://apis.baidu.com/netpopo/express/express1";
        //String httpArg = "type=SFEXPRESS&number=471799413917";
    /**
     * @param httpArg
     *            :参数
     * @return 返回结果
     */
    public static String requestExpress(String httpArg) {
        BufferedReader reader = null;
        String result = null;
        StringBuffer sbf = new StringBuffer();
        String httpUrl= httpUrlExpress + "?" + httpArg;

        try {
            URL url = new URL(httpUrl);
            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setRequestMethod("GET");
            // 填入apikey到HTTP header
            connection.setRequestProperty("apikey",  CommonUtil.getPropertiesValue("config.properties","apikey"));
            connection.connect();
            InputStream is = connection.getInputStream();
            reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String strRead = null;
            while ((strRead = reader.readLine()) != null) {
                sbf.append(strRead);
                sbf.append("\r\n");
            }
            reader.close();
            result = sbf.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }


    /**
     * @param httpArg
     *            :参数
     * @return 返回结果
     */
    public static String requestLogiscs(String httpArg) {
        BufferedReader reader = null;
        String result = null;
        StringBuffer sbf = new StringBuffer();
        final String httpUrl = httpUrlLogisics + "?" + httpArg;
        URL url =null;
        HttpURLConnection connection = null;
        InputStream is = null;
        boolean flag = true;
        int i = 0;
        try {
            while (flag && i <= 10){
                url = new URL(httpUrl+"&timestamp="+new Date().getTime());
                connection = (HttpURLConnection) url
                        .openConnection();
                connection.setRequestMethod("GET");
                // 填入apikey到HTTP header
                connection.setRequestProperty("apikey", CommonUtil.getPropertiesValue("config.properties","apikey"));
                connection.connect();
                is = connection.getInputStream();
                reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                String strRead = null;
                while ((strRead = reader.readLine()) != null) {
                    sbf.append(strRead);
                    sbf.append("\r\n");
                }
                reader.close();
                result = sbf.toString();
               //logger.info(i + ":" + result);
               if(result.indexOf("{\"status\"") > -1){
                   flag = false;
                   logger.info("获取的值："+result);
                   if(result.indexOf("{\"status\"") > 0 && result.indexOf("}}") != -1){
                       result = result.substring(result.indexOf("{\"status\""),result.indexOf("}}"))+"}}";
                   }
                   logger.info("成功~！:"+result);
               }else{
                   logger.info("失败");
               }
               i++;
           }
        } catch (Exception e) {
            logger.error(e.getMessage(),e);
        } finally {
            if(null != is){
                try {
                    is.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(),e);
                }
            }
            if(null != reader){
                try {
                    reader.close();
                } catch (IOException e) {
                    logger.error(e.getMessage(),e);
                }
            }
        }
        logger.info("结果："+result);
        return result;
    }

}

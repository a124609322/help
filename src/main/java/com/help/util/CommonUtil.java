package com.help.util;

import com.chuandu.constant.Constant;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.util.*;

/**
 *  
 * 项目名称：zlzj 
 * 类名称：CommonUtil 
 * 类描述： 通用工具类 创建人：愤青 
 * 创建时间：2015年2月16日 下午8:48:16 
 * 修改人：愤青
 * 修改时间：2015年2月16日 下午8:48:16 
 * 修改备注：
 * 
 * @version
 * 
 */
public class CommonUtil {
	private static Logger logger = Logger.getLogger(CommonUtil.class);
	private static Properties prop;

	/**
	 * 
	 * @Description: 获取随机数字
	 * @param size
	 * @return 设定文件 String 返回类型
	 */
	public static String getRandomNum(int size) {
		StringBuffer sb = new StringBuffer();
		Random r = new Random();
		int n2 = 0;
		for (int i = 0; i < size; i++) {
			n2 = r.nextInt(10);
			sb.append(n2);
		}

		return sb.toString();
	}

	/**
	 * 
	 * 方法描述:根据文件和key获取properties的值
	 * 创建人：张郑 
	 * 创建时间：2015年10月12日下午3:40:24
	 * 
	 * @param url
	 *            properties名称
	 * @param key
	 * @return String
	 * @throws IOException
	 * @throws
	 */
	public static String getPropertiesValue(String url, String key)
			throws IOException {
		if (null == prop) {
			prop = new Properties();
		}
		String classPath = CommonUtil.class.getClassLoader().getResource("/")
				.getPath();

		// 转码处理(主要针对空格)
		classPath = URLDecoder.decode(classPath, "utf-8");
		InputStream in = new FileInputStream(classPath + url);
		prop.load(in);
		return prop.getProperty(key).trim();
	}

	/**
	 * 
	 * 方法描述:拷贝文件
	 * 创建人：张郑 
	 * 创建时间：2015年10月12日下午3:42:14
	 * 
	 *            源文件流
	 * @param target
	 *            目的地文件
	 * @throws IOException
	 * @throws
	 */
	public static void copyFile(InputStream fis, File target){
		FileOutputStream fos=null;
		try {
			fos = new FileOutputStream(target);
			byte[] buffer = new byte[1024];
			int len = 0;
			while ((len = fis.read(buffer)) > -1) {
				fos.write(buffer, 0, len);
			}
		} catch (FileNotFoundException e) {
			logger.error("文件没有找到", e);
		} catch (IOException e) {
			logger.error("文件读取错误", e);
		}finally{
			try {
				if(fis!=null){
					fis.close();
				}
				if(fos!=null){
					fos.close();
				}
			} catch (IOException e) {
				logger.error("文件读取错误", e);
			}
		}
	}

	/**
	 * 
	 * 方法描述:创建用户编号
	 * 创建人：pengkejie 
	 * 创建时间：2015-10-14下午6:06:43
	 * 
	 * @param code	  传入从数据库中查询出来的最后一个创建的商家编号,传入格式为015100900001,总共12位数字
	 * @return 返回格式为015100900001的一串字符串
	 * @throws
	 */

	public static String createCode(String typeCode, String code) {
		int length = code.length();
		if (length < 12) {
			return null;
		}
		String date = DateUtil.format(new Date(), "yyMMdd");// 获取当前日期
		String oldDateString = code.substring(1, 7);// 获取传入编号中的时间段
		String oldOrderString = code.substring(1);// 获取传入编号的排序段

		Long dateLong = Long.valueOf(date);
		Long oldDateLong = Long.valueOf(oldDateString);
		Long oldOrderLong = Long.valueOf(oldOrderString);
		Long orderLong = Long.valueOf(date + "00001");

		if (dateLong.longValue() == oldDateLong.longValue()) {// 做判断,如果是当前日期就将编号加一
			orderLong = oldOrderLong + 1;
		}
		code = typeCode + orderLong.toString();
		return code;

	}
	/**
	 * 
	 * 方法描述:图片文件上传
	 * 创建人：刘玉林
	 * 创建时间：2015年10月16日下午3:33:51
	 * @param request
	 * @param diskPath 目标路径
	 * @return 保存的文件名
	 * @throws IOException
	 * @throws
	 */
	@SuppressWarnings({ "rawtypes" })
	public static String uploadImage(HttpServletRequest request, String diskPath) {
		System.out.println(request.getParameterNames());
	    // 获取本地文件路径
		String fileName = UUID.randomUUID().toString() ;
    	FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		// 中文乱码
		upload.setHeaderEncoding("utf-8");
		File file=null;
		try {
			file = new File(diskPath, fileName + ".jpg");
			file.getParentFile().mkdirs();
			file.createNewFile();
			List<FileItem> items = upload.parseRequest(request);
			Iterator iter = items.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (!item.isFormField()){
					CommonUtil.copyFile(item.getInputStream(), file);
				}
			}
		} catch (FileUploadException e) {
			logger.error("文件目录没有找到", e);
		} catch (IOException e) {
			logger.error("文件读取异常", e);
		}
	    return file.getName();
	}
	public static void deleteFiles(File file){
		if(!file.isFile()){
			if(file.listFiles()!=null){
				for (File f : file.listFiles()) {
					deleteFiles(f);
					f.delete();
				}
			}
		}
		file.delete();
	}
	
	public static boolean checkTime(Date oldDate, Date newDate) {
		boolean flag = false;
		//时间差（毫秒）
		long diff = newDate.getTime() - oldDate.getTime();
		try {
			
			String day = getPropertiesValue("timeConfig.properties", "loginTime");
		
			int days = Integer.parseInt(day);
			//30天的毫秒数
			long farmat = days * 24 * 60 * 60 * 1000;
			if(diff <= farmat) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (IOException e) {
			logger.error("文件读取异常", e);
		} catch (Exception e) {
			logger.error("数据转换异常", e);
		}
		return flag;
	}

	/**
	 * 
	 * 方法描述:
	 * 创建人：pengkejie
	 * 创建时间：2015-10-28下午4:13:20
	 * @return
	 * @throws
	 */
	public static String getToken() {
		String token = UUID.randomUUID().toString().replaceAll("-", "");
		return token;
	}

	public static String getFileNameExtendName(String fileName){
		return fileName.substring(fileName.indexOf('.'),fileName.length());
	}

	public static String getImageUrlRealFileName(String fileUrl){
		return fileUrl.substring(fileUrl.lastIndexOf('/')+1,fileUrl.length());
	}

	public static int calculatePage(int total, int limit) {
		return total/limit+(total%limit!=0?1:0);
	}

	public static String uuid() {
		String uuid = UUID.randomUUID().toString();
		uuid = uuid.replace("-","");
		return uuid;
	}

	public static String fetchExtendName(String filename){
		return filename.substring(filename.lastIndexOf('.'),filename.length());
	}

	public static String copySingleFile(String id,MultipartFile file,String properties) throws IOException {
		String picName = new Date().getTime()+CommonUtil.fetchExtendName(file.getOriginalFilename());
		String prefix = CommonUtil.getPropertiesValue(Constant.PROPERTIES_NAME, properties);
		String fileDocument = CommonUtil.getPropertiesValue(Constant.PROPERTIES_NAME, Constant.BASE_PATH)+prefix+id;
		File doc = new File(fileDocument);
		if(!doc.exists()){
			doc.mkdirs();
		}
		String pics = prefix+id+"/"+ picName;
		// 文件保存路径
		String filePath = fileDocument+"/"+ picName;
		file.transferTo(new File(filePath));
		return pics;
	}

	public static void delteSingleFile(String url) throws IOException {
		String prefix = CommonUtil.getPropertiesValue(Constant.PROPERTIES_NAME, Constant.BASE_PATH);
		File doc = new File(prefix+url);
		if(doc.exists()&&doc.isFile()){
			doc.delete();
		}else if(doc.exists()&&doc.isDirectory()){
			File[] files = doc.listFiles();
			for(File file : files){
				file.delete();
			}
			doc.delete();
		}
	}

	public static String handlerExcelDouble(String substring) {

		if(substring.indexOf(".") != -1 && "00".equals(substring.substring(substring.indexOf(".")+1, substring.length()))){
			return substring.substring(0,substring.indexOf("."));
		}
		return substring;
	}
}

//&& endStr.equals("00")

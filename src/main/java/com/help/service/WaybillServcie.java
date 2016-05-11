package com.help.service;

import com.chuandu.model.Waybill;
import com.chuandu.vo.Pager;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/1.
 */
public interface WaybillServcie {

    List<Waybill> selectPager(Pager pager);

    boolean save(Waybill waybill);

    boolean deleteList(String[] idList, int i);

    void updateWaybill(Waybill waybill);

    void deletedList(String[] idList);

    void deleteAll();

    Map<String, Object> importwaybill(InputStream inputStream, String id) throws Exception;

    Map<String,Object> importinfo(InputStream inputStream) throws IOException, InvalidFormatException;

    Map<String,Object> importproblem(InputStream inputStream) throws IOException, InvalidFormatException;

    Waybill selectByCode(String code) throws ParseException;
}

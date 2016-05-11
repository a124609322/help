package com.help.service;

import com.chuandu.model.Logistics;
import com.chuandu.model.Robot;
import com.chuandu.vo.Pager;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/4/5.
 */
public interface LogisticsServcie {
    List<Logistics> selectPager(Pager pager);

    boolean save(Logistics logistics) throws IOException;

    void update(Logistics logistics);

    void deleteList(String[] idList);

    Map<String,Object> batchupdate(InputStream inputStream, String manangerId) throws IOException, InvalidFormatException;

    boolean autoHandleWaybill(Robot robot) throws IOException;
}

package com.help.vo;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2015/11/9.
 */
public class Pager {

    private int limit;

    private int start;

    private int total;

    private int page;

    private String orderBy = "createDate";

    private String orderType = "desc";

    private Map<String,Object> dataMap;

    private List<?> dataList;


    public Pager() {
    }


    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    public void setDataMap(Map<String, Object> dataMap) {
        this.dataMap = dataMap;
    }

    public List<?> getDataList() {
        return dataList;
    }

    public void setDataList(List<?> dataList) {
        this.dataList = dataList;
    }
}

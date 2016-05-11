package com.help.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Logistics {
    private String id;

    private String waybillid;

    private String info;

    private Date createdate;

    private Date modifydate;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date datetime;

    private Integer deleted;

    private String managerid;

    private Waybill waybill;

    private Manager manager;

    private String logo;

    private String origin;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getWaybillid() {
        return waybillid;
    }

    public void setWaybillid(String waybillid) {
        this.waybillid = waybillid == null ? null : waybillid.trim();
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info == null ? null : info.trim();
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Date getModifydate() {
        return modifydate;
    }

    public void setModifydate(Date modifydate) {
        this.modifydate = modifydate;
    }

    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public String getManagerid() {
        return managerid;
    }

    public void setManagerid(String managerid) {
        this.managerid = managerid == null ? null : managerid.trim();
    }

    public Waybill getWaybill() {
        return waybill;
    }

    public void setWaybill(Waybill waybill) {
        this.waybill = waybill;
    }

    public Manager getManager() {
        return manager;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
    }

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }
}
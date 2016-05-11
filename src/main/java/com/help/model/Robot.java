package com.help.model;

import java.util.Date;

public class Robot {
    private String id;

    private String batchcode;

    private String channel;

    private Integer isautoupdate;

    private String currentstate;

    private String state1;

    private String state2;

    private String state3;

    private String state4;

    private String state5;

    private String state6;

    private String interval;

    private Date createdate;

    private Date modifydate;

    private Integer deleted;

    private String managerid;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getBatchcode() {
        return batchcode;
    }

    public void setBatchcode(String batchcode) {
        this.batchcode = batchcode == null ? null : batchcode.trim();
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel == null ? null : channel.trim();
    }

    public Integer getIsautoupdate() {
        return isautoupdate;
    }

    public void setIsautoupdate(Integer isautoupdate) {
        this.isautoupdate = isautoupdate;
    }

    public String getCurrentstate() {
        return currentstate;
    }

    public void setCurrentstate(String currentstate) {
        this.currentstate = currentstate == null ? null : currentstate.trim();
    }

    public String getState1() {
        return state1;
    }

    public void setState1(String state1) {
        this.state1 = state1 == null ? null : state1.trim();
    }

    public String getState2() {
        return state2;
    }

    public void setState2(String state2) {
        this.state2 = state2 == null ? null : state2.trim();
    }

    public String getState3() {
        return state3;
    }

    public void setState3(String state3) {
        this.state3 = state3 == null ? null : state3.trim();
    }

    public String getState4() {
        return state4;
    }

    public void setState4(String state4) {
        this.state4 = state4 == null ? null : state4.trim();
    }

    public String getState5() {
        return state5;
    }

    public void setState5(String state5) {
        this.state5 = state5 == null ? null : state5.trim();
    }

    public String getState6() {
        return state6;
    }

    public void setState6(String state6) {
        this.state6 = state6 == null ? null : state6.trim();
    }

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval == null ? null : interval.trim();
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
}
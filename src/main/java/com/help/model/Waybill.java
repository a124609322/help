package com.help.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Waybill {
    private String id;

    private String code;

    private String expresscode;

    private String expresscompany;

    private String batchcode;

    private String name;

    private String phone;

    private String address;

    private String goods1;

    private Integer amount1;

    private BigDecimal price1;

    private String goods2;

    private Integer amount2;

    private BigDecimal price2;

    private String goods3;

    private Integer amount3;

    private BigDecimal price3;

    private BigDecimal worth;

    private BigDecimal weight;

    private BigDecimal insurance;

    private String sender;

    private Date createdate;

    private Date modifydate;

    private Integer deleted;

    private String managerid;

    private Integer problem;

    private String problemreason;

    private String channel;

    private Integer isautoupdate;

    private String robotid;

    private List<Logistics> logisticsList;

    private Integer isEnd;

    private Date endtime;

    private Integer currentstate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getExpresscode() {
        return expresscode;
    }

    public void setExpresscode(String expresscode) {
        this.expresscode = expresscode == null ? null : expresscode.trim();
    }

    public String getBatchcode() {
        return batchcode;
    }

    public void setBatchcode(String batchcode) {
        this.batchcode = batchcode == null ? null : batchcode.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getGoods1() {
        return goods1;
    }

    public void setGoods1(String goods1) {
        this.goods1 = goods1 == null ? null : goods1.trim();
    }

    public Integer getAmount1() {
        return amount1;
    }

    public void setAmount1(Integer amount1) {
        this.amount1 = amount1;
    }



    public String getGoods2() {
        return goods2;
    }

    public void setGoods2(String goods2) {
        this.goods2 = goods2 == null ? null : goods2.trim();
    }

    public Integer getAmount2() {
        return amount2;
    }

    public void setAmount2(Integer amount2) {
        this.amount2 = amount2;
    }



    public String getGoods3() {
        return goods3;
    }

    public void setGoods3(String goods3) {
        this.goods3 = goods3 == null ? null : goods3.trim();
    }

    public Integer getAmount3() {
        return amount3;
    }

    public void setAmount3(Integer amount3) {
        this.amount3 = amount3;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender == null ? null : sender.trim();
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

    public Integer getProblem() {
        return problem;
    }

    public void setProblem(Integer problem) {
        this.problem = problem;
    }

    public String getProblemreason() {
        return problemreason;
    }

    public void setProblemreason(String problemreason) {
        this.problemreason = problemreason == null ? null : problemreason.trim();
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

    public String getRobotid() {
        return robotid;
    }

    public void setRobotid(String robotid) {
        this.robotid = robotid == null ? null : robotid.trim();
    }

    public BigDecimal getPrice1() {
        return price1;
    }

    public void setPrice1(BigDecimal price1) {
        this.price1 = price1;
    }

    public BigDecimal getPrice2() {
        return price2;
    }

    public void setPrice2(BigDecimal price2) {
        this.price2 = price2;
    }

    public BigDecimal getPrice3() {
        return price3;
    }

    public void setPrice3(BigDecimal price3) {
        this.price3 = price3;
    }

    public BigDecimal getWorth() {
        return worth;
    }

    public void setWorth(BigDecimal worth) {
        this.worth = worth;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public BigDecimal getInsurance() {
        return insurance;
    }

    public void setInsurance(BigDecimal insurance) {
        this.insurance = insurance;
    }

    public List<Logistics> getLogisticsList() {
        return logisticsList;
    }

    public void setLogisticsList(List<Logistics> logisticsList) {
        this.logisticsList = logisticsList;
    }

    public String getExpresscompany() {
        return expresscompany;
    }

    public void setExpresscompany(String expresscompany) {
        this.expresscompany = expresscompany;
    }

    public Integer getIsEnd() {
        return isEnd;
    }

    public void setIsEnd(Integer isEnd) {
        this.isEnd = isEnd;
    }

    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public Integer getCurrentstate() {
        return currentstate;
    }

    public void setCurrentstate(Integer currentstate) {
        this.currentstate = currentstate;
    }
}
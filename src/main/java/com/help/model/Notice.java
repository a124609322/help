package com.help.model;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Notice {
    private String id;

    private String title;

    private String intro;

    private Date createdate;

    private Date modifydate;

    private Integer deleted;

    private String managerid;

    private String pic;

    private String content;

    private Manager manager;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date top;

    private String types;

    private Integer isRoll;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro == null ? null : intro.trim();
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

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic == null ? null : pic.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Manager getManager() {
        return manager;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
    }

    public Date getTop() {
        return top;
    }

    public void setTop(Date top) {
        this.top = top;
    }

    public String getTypes() {
        return types;
    }

    public void setTypes(String types) {
        this.types = types;
    }

    public Integer getIsRoll() {
        return isRoll;
    }

    public void setIsRoll(Integer isRoll) {
        this.isRoll = isRoll;
    }
}
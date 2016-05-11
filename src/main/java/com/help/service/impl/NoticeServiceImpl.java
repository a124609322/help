package com.help.service.impl;

import com.chuandu.constant.Constant;
import com.chuandu.dao.NoticeMapper;
import com.chuandu.model.Notice;
import com.chuandu.service.NoticeServcie;
import com.chuandu.util.CommonUtil;
import com.chuandu.vo.Pager;
import com.mysql.jdbc.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2016/3/28.
 */
@Service
public class NoticeServiceImpl extends BaseService implements NoticeServcie {

    @Resource
    private NoticeMapper noticeMapper;

    @Override
    public List<Notice> selectPager(Pager pager) {
        int count = noticeMapper.selectPagerForCount(pager);
        pager.setTotal(count);
        return noticeMapper.selectPager(pager);
    }

    @Override
    public boolean save(Notice notice) throws ParseException {
        Notice temp = noticeMapper.findByTypes(notice);
        if(null != temp){
            return false;
        }
        notice.setId(CommonUtil.uuid());
        notice.setCreatedate(new Date());
        notice.setDeleted(1);
        notice.setTop(Constant.SIMPLEDATEFORMAT.parse(Constant.NOTICE_DEFATUL_TOP));
        notice.setIsRoll(Constant.NOTICE_ISROLL_FALSE);
        noticeMapper.insertSelective(notice);
        return true;
    }

    @Override
    public boolean update(Notice notice) {
        if(null != notice.getTypes() && !notice.getTypes().equals(Constant.NOTICE_TYPES_OTHER)){
            Notice temp = noticeMapper.findByTypes(notice);
            if(null != temp){
                return false;
            }
        }
        notice.setModifydate(new Date());
        noticeMapper.updateByPrimaryKeySelective(notice);
        return true;
    }

    @Override
    public void deleteList(String[] idList) {
        for(String id : idList){
            noticeMapper.deleteByPrimaryKey(id);
        }
    }

    @Override
    public void updateTop(Notice notice) throws ParseException {
        if(null == notice.getTop()){
            notice.setTop(new Date());
        }else{
            notice.setTop(Constant.SIMPLEDATEFORMAT.parse(Constant.NOTICE_DEFATUL_TOP));
        }
        noticeMapper.updateByPrimaryKeySelective(notice);
    }

    @Override
    public boolean updateRoll(Notice notice) {
        if(null != notice.getIsRoll() && notice.getIsRoll() == Constant.NOTICE_ISROLL_TRUE){
            List<Notice> noticeList = noticeMapper.selectRoll();
            if(null == noticeList || noticeList.size() >=5){
                return false;
            }
        }
        noticeMapper.updateByPrimaryKeySelective(notice);
        return true;
    }

    @Override
    public Notice select(Notice notice) {
        if(!StringUtils.isNullOrEmpty(notice.getTypes())){
            List<Notice> notices = noticeMapper.selectByTypes(notice.getTypes());
            if(null != notices && notices.size()>0){
                return notices.get(0);
            }
            return null;
        }
        return noticeMapper.selectByPrimaryKey(notice.getId());
    }

    @Override
    public List<Notice> selectAll() {
        return noticeMapper.selectAll();
    }
}

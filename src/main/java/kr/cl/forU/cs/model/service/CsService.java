package kr.cl.forU.cs.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.cs.model.dao.CsDao;
import kr.cl.forU.cs.model.vo.QNA;

@Service
public class CsService {

	@Autowired
	CsDao dao;

    public List<QNA> qnaList() {
    	return dao.findQnaList();
    }


}

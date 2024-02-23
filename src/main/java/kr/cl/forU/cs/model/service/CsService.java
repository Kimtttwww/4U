package kr.cl.forU.cs.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import kr.cl.forU.cs.model.dao.CsDao;
import kr.cl.forU.cs.model.vo.QNA;

@Service
public class CsService {

	@Autowired
	CsDao dao;

	public Page<QNA> qnaList(Page<QNA> qnaPage) {
		return dao.findQnaList(qnaPage);
	}


}

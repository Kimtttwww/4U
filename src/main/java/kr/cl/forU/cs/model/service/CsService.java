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

    public List<QNA> qnaList(int memberNo) {
    	return dao.findQnaList(memberNo);
    }

	public int addAnswer(QNA newAnswer) {
		return dao.addAnswer(newAnswer);
	}

	public int newQna(QNA newQna) {
		return dao.newQna(newQna);
	}

	public List<QNA> sellerQna() {
		return dao.sellerQna();
	}


}

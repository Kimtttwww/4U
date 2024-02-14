package kr.cl.forU.cs.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.cl.forU.cs.model.dao.CsDao;

@Service
public class CsService {

	@Autowired
	CsDao dao;
}

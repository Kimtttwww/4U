package kr.cl.forU.cs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.cl.forU.cs.model.service.CsService;
import kr.cl.forU.cs.model.vo.QNA;

@RestController
public class CsController {

	@Autowired
	CsService service;
	

    @GetMapping("/qna/listqna")
    public List<QNA> qnaList() {
        return service.qnaList();
    }
}


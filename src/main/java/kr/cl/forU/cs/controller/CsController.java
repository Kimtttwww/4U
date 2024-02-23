package kr.cl.forU.cs.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.ui.Model;

import jakarta.servlet.http.HttpSession;
import kr.cl.forU.cs.model.service.CsService;
import kr.cl.forU.cs.model.vo.QNA;
import kr.cl.forU.member.model.vo.Member;

@RestController
public class CsController {

	@Autowired
	CsService service;
	
    @GetMapping("/qna/listqna")
    public ResponseEntity<Page<QNA>> qnaList(
            @RequestParam(defaultValue = "1") int curPage, 
            String search, String keyword) {
        
        int pageSize = 10; // 페이지당 항목 수 설정

        // curPage는 0부터 시작하지 않으므로 1을 빼줌
        Pageable pageable = PageRequest.of(curPage - 1, pageSize);
        
        // DB에서 글 목록 조회 및 페이징 처리
        Page<QNA> qnaPage = service.qnaList(pageable, search, keyword);
        
        return ResponseEntity.ok(qnaPage);
    }
}


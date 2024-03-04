package kr.cl.forU.cs.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.cl.forU.cs.model.service.CsService;
import kr.cl.forU.cs.model.vo.QNA;

@RestController
public class CsController {

	@Autowired
	CsService service;
	

    @GetMapping("/qna/listqna")
    public List<QNA> qnaList(@RequestParam int memberNo) {
        return service.qnaList(memberNo);
    }
    
    @PostMapping("/qna/addanswer")
    public int addAnswer(@RequestBody Map<String , String> answerData) {
        // 클라이언트로부터 전송된 데이터를 매핑하여 처리
    	int qnaNo = Integer.parseInt(answerData.get("qnaNo"));
        String qnaAnswer = answerData.get("answerText");

        // 새로운 답변 모델 생성
        QNA newAnswer = new QNA();
        newAnswer.setQnaNo(qnaNo);
        newAnswer.setQnaAnswer(qnaAnswer);

        // 서비스를 통해 새로운 답변을 추가
		return service.addAnswer(newAnswer);
    }
    
    @PostMapping("/qna/newqna")
    public int newQna(@RequestBody Map<String, String> newQnaData) {
    	String qnaTitle = newQnaData.get("qnaTitle");
    	String qnaContent = newQnaData.get("qnaContent");
    	String memberNo = newQnaData.get("memberNo");
    	
    	QNA newQna = new QNA();
    	newQna.setQnaWriter(memberNo);
    	newQna.setQnaTitle(qnaTitle);
    	newQna.setQnaContent(qnaContent);
    	
    	return service.newQna(newQna);
    }
}


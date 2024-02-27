package kr.cl.forU.cs.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class QNA {
	private int qnaNo;
	private String qnaWriter;
	private String qnaTitle;
	private String qnaContent;
	private String createDate;
	private String qnaAnswer;
	private String answerDate;
	private String status;
	
	private String memberId;
}

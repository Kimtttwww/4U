package kr.cl.forU.cs.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChattingMessage {

	/** 메세지 번호 */
	private int cmNo;
	/** 메세지 */
	private String message;
	/** 회원 번호 */
	private int cmWriter;
	/** 작성일 */
	private Date createDate;
	/** 방번호 */
	private int chatRoomNo;
	private String status;
}

package kr.cl.forU.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Grade {

	private int gradeNo;
	private String gradeName;
	private int pointRate;
}

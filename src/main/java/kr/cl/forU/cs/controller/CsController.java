package kr.cl.forU.cs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import kr.cl.forU.cs.model.service.CsService;

@Controller
public class CsController {

	@Autowired
	CsService service;
}

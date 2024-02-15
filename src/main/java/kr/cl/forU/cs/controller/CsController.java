package kr.cl.forU.cs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import kr.cl.forU.cs.model.service.CsService;

@RestController
public class CsController {

	@Autowired
	CsService service;
}

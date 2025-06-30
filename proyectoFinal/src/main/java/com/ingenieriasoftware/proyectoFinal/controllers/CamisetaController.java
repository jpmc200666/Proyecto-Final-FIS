package com.ingenieriasoftware.proyectoFinal.controllers;


import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaDTO;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICamisetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/CamisetaController")
public class CamisetaController {

    @Autowired
    private ICamisetaService camisetaService;

    @GetMapping("/listadoCamisetas")
    public ResponseEntity<List<CamisetaDTO>> listarCamisetas(){
        return new ResponseEntity<>(this.camisetaService.findAll(), HttpStatus.OK);
    }
}

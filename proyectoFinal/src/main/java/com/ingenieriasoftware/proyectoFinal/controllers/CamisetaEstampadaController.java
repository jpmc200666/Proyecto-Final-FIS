package com.ingenieriasoftware.proyectoFinal.controllers;

import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaEstampadaDTO;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICamisetaEstampadaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/CamisetaEstampadaController")
public class CamisetaEstampadaController {

    @Autowired
    private ICamisetaEstampadaService camisetaEstampadaService;

    @PostMapping(
            path = "/creacion",
            consumes = { MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<CamisetaEstampadaDTO> crearCamisetaEstampada(
            @RequestBody CamisetaEstampadaDTO camisetaEstampadaDTO) {
        System.out.println("Recibido: ");
        return new ResponseEntity<>(
                this.camisetaEstampadaService.crearCamisetaEstampada(camisetaEstampadaDTO),
                HttpStatus.OK
        );
    }

}


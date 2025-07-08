package com.ingenieriasoftware.proyectoFinal.controllers;

import com.ingenieriasoftware.proyectoFinal.dtos.EstampaDTO;
import com.ingenieriasoftware.proyectoFinal.models.Estampa;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.IEstampaService;

@RestController
@RequestMapping("/EstampaController")
public class EstampaController {

    @Autowired
    private IEstampaService estampaService;

    @GetMapping("/listadoEstampas")
    public ResponseEntity<List<EstampaDTO>> listaEstampas() {

        List<EstampaDTO> estampas = this.estampaService.findAll();

        return new ResponseEntity<>(estampas, HttpStatus.OK);
    }
}

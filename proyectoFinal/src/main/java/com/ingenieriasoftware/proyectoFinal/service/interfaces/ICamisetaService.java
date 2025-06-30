package com.ingenieriasoftware.proyectoFinal.service.interfaces;

import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaDTO;

import java.util.List;

public interface ICamisetaService {

    List<CamisetaDTO> findAll();
}

package com.ingenieriasoftware.proyectoFinal.service.interfaces;

import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaEstampadaDTO;
import com.ingenieriasoftware.proyectoFinal.models.CamisetaEstampada;

import java.util.Optional;

public interface ICamisetaEstampadaService {
    CamisetaEstampada findById(Long id);
    CamisetaEstampadaDTO crearCamisetaEstampada(CamisetaEstampadaDTO camisetaEstampadaDTO);
}

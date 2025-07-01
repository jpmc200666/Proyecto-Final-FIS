package com.ingenieriasoftware.proyectoFinal.service.interfaces;

import com.ingenieriasoftware.proyectoFinal.dtos.EstampaDTO;
import java.util.List;

public interface IEstampaService {
    List<EstampaDTO> findAll();
}

package com.ingenieriasoftware.proyectoFinal.service.interfaces;

import com.ingenieriasoftware.proyectoFinal.models.Carrito;

public interface ICarritoService {

    Carrito getActiveByUser(Long clientId);

}

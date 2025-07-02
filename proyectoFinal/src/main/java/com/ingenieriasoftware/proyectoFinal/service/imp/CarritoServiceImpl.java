package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.models.Carrito;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICarritoService;
import org.springframework.stereotype.Service;

@Service
public class CarritoServiceImpl implements ICarritoService {
    @Override
    public Carrito getActiveByUser(Long clientId) {
        return null;
    }
}

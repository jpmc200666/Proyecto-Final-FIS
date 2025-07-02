package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.models.Carrito;
import com.ingenieriasoftware.proyectoFinal.models.Pedido;
import com.ingenieriasoftware.proyectoFinal.repositories.CarritoRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.PedidoRepository;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarritoServiceImpl implements ICarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public Carrito getActiveByUser(Long clientId) {

        Optional<Pedido> pedidoOptional = pedidoRepository.findByClienteAndEstado(clientId, "AC");
        if (pedidoOptional.isPresent()) return pedidoOptional.get().getCarrito();

//        carritoRepository.
        return null;
    }
}

package com.ingenieriasoftware.proyectoFinal.service.interfaces;

import com.ingenieriasoftware.proyectoFinal.models.Pago;
import com.ingenieriasoftware.proyectoFinal.models.Pedido;

public interface IPagoService {

    Pago createPago(Pedido pedido);

    Pedido actualizarPedido(Pedido pedido);

    Pedido findById(Long id);

    Pedido pagarPedido(Long idPedido);

}

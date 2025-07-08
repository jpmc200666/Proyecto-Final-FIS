package com.ingenieriasoftware.proyectoFinal.service.interfaces;

import com.ingenieriasoftware.proyectoFinal.models.CamisetaEstampada;
import com.ingenieriasoftware.proyectoFinal.models.Carrito;
import com.ingenieriasoftware.proyectoFinal.models.ItemCarrito;

public interface ICarritoService {

    /**
     * Retornamos el carrito activo (si existe) para el cliente seleccionadado
     * Si el pedido no existe, creamos un nuevo pedido
     * @param clientId  id del cliente
     * @return Carrito
     */
    Carrito getActiveByUser(Long clientId);
    /**
     * Agregamos un item carrito (relacion entre carriot y camiseta estampada)
     * @param idCarrito             id del carrito del ususario
     * @param idCamisetaEstampada   id de la camiseta estampada a agregar
     * @param cantidad              cantidad de camisetas a comprar
     * @return                      ItemCarrito
     */
    ItemCarrito agregarItemCarrito(Long idCarrito, Long idCamisetaEstampada, int cantidad);
    /**
     * Buscamos un Carrito por su id
     * @param id    idCarrito
     * @return      obj Carrito
     */
    Carrito findById(Long id);
}

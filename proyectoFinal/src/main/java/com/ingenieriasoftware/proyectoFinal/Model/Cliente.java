/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

import java.util.List;
/**
 *
 * @author yanpi
 */
public class Cliente extends UsuarioAbs{
    private List<Pedido> historialCompras;
    private Pedido pedido;
    private Carrito carrito;
            
    public Cliente(){
        this.carrito = new Carrito();
        this.pedido = new Pedido(MetodosPago.MASTERCARD, carrito);
    }
    
    public Pedido realizarPedido(Pago metodoPago, String direccion){
        return null;
    }
    
    public List<ItemCarrito> verItemCarrito(){
        return null;
    }
}

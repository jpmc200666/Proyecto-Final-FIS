/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

import java.util.Date;
/**
 *
 * @author yanpi
 */
public class Pedido {
    private int id;
    private Date fecha;
    private String estado;
    private Pago pago;
    private Carrito carrito;
    
    public Pedido(MetodosPago metodoPago, Carrito carrito){
        this.pago = new Pago(metodoPago);
        this.carrito = carrito;
    }
    
    public Pedido crearPago(){
        
    }
    
    public void eliminarCarrito(){
        
    }
}

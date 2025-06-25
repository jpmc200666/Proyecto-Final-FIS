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
public class Pago {
    private String nombre;
    private int cedula;
    private MetodosPago metodoPago;
    private String idTransaccion;
    private int idPedido;
    private Date fechaTransaccion;
    private String estado;
    private String plataforma;
    
    public Pago(MetodosPago metodoPago){
        this.metodoPago = metodoPago;
    }
    
    public boolean pagar(){
        return false;
    }
}

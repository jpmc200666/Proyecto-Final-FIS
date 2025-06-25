/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

/**
 *
 * @author yanpi
 */
public class Proveedor {
    private String nombreProveedor;
    private int idProveedor;
    private int tiempoEntregaEstimado;
    private int cantidadDisponible;
    
    public Proveedor(){
        
    }
    
    public boolean consultaDisponibilidad(String material, int cantidad){
        return false;
    }
    
    public boolean solicitarPedidos(String material, int cantidad){
        return false;
    }
}
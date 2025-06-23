/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Date;
/**
 *
 * @author yanpi
 */
public class Stock {
    private int id;
    private int cantidad;
    private Map<Class<? extends Prenda>, List<Prenda>> prendas;
    private Date fechaUltimaActualizacion;
    
    public Stock(Prenda prenda){
        this.prendas = new HashMap<Class<? extends Prenda>, List<Prenda>>();
        agregarPrenda(prenda);
        this.fechaUltimaActualizacion = new Date(); 
    }
    
    public String agregarPrenda(String material, int cantidad){
        
    }
    
    public int consultarDisponibilidad(String material){
        
    }
    
    public void notificarStockBajo(){
        
    }
    
    public void congelarPrenda(Prenda prenda, int cantidad){
        
    }
    
    public void descongelarPrenda(Prenda prenda, int cantidad){
        
    }
}

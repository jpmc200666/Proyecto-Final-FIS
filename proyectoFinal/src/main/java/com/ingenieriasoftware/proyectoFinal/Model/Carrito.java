/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

import java.util.List;
import java.util.Date;
import java.util.ArrayList;
/**
 *
 * @author yanpi
 */
public class Carrito {
    private int id;
    private List<ItemCarrito> elementosCarrito;
    private Date fechaCreacion;
    private int vigencia;
    private double totalCarrito;
    
    public Carrito(){
        this.elementosCarrito = new ArrayList<>();
        ItemCarrito nuevo = new ItemCarrito();
        this.elementosCarrito.add(nuevo);
    }
    
    public void agregarItemCarrito(ItemCarrito item){
        
    }
    
    public void eliminarItemCarrito(int itemid){
        
    }
}

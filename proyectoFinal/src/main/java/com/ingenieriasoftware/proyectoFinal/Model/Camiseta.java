/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

/**
 *
 * @author yanpi
 */
public class Camiseta implements Prenda{
    private int id;
    private String color;
    private Tallas talla;
    private String material;
    private double precioFinal;
    private EstampaAplicada estampaAplicada;
    
    public Camiseta(Tallas talla){
        this.talla = talla;
    }
    
    public Camiseta aplicarEstampa(EstampaAplicada estampaAplicada){
        
    }   
}

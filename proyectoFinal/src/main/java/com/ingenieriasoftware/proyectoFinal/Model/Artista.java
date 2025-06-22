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
public class Artista {
    
    private List<Estampa> estampasPublicadas;
    private List<Catalogos> catalogos;
    private double gananciasTotales;
    
    public Artista(){
        
    }
    
    public String subirEstampa(Catalogo catalogo, Estampa estampa){
        return "";
    }
    
    public boolean eliminarEstampa(int id){
           return false;
    }
    
    public List<Catalogo> listaCatalogos(){
        
    }
    
    public double consultarGanancias(){
        
    }
    
    public double obtenerRatingPromedio(){
        
    }
}

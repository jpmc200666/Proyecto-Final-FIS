/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

import java.util.List;
import java.util.ArrayList;
/**
 *
 * @author yanpi
 */
public class Artista {
    
    private List<Estampa> estampasPublicadas;
    private List<Catalogo> catalogos;
    private double gananciasTotales;
    
    public Artista(Catalogo catalogo){
        this.catalogos = new ArrayList<>();
        this.catalogos.add(catalogo);
    }
    
    public String subirEstampa(Catalogo catalogo, Estampa estampa){
        return "";
    }
    
    public boolean eliminarEstampa(int id){
           return false;
    }
    
    public List<Catalogo> listaCatalogos(){
        return null;
    }
    
    public double consultarGanancias(){
        return 0.0;
    }
    
    public double obtenerRatingPromedio(){
        return 0.0;
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

import java.util.Date;
import java.util.List;
/**
 *
 * @author yanpi
 */
public class Estampa {
    private int id;
    private Artista objArtista;
    private String nombre;
    private String descripicion;
    private List<Imagen> imagenes;
    private double precioBase;
    private int rating;
    private String tema;
    private Date fechaPublicacion;
    private boolean estado;
    
    public Estampa(){
        
    }
    
    public void calificarEstampa(int calificacion){
        
    }
}

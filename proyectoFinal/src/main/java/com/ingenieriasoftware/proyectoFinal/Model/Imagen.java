/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.Model;

/**
 *
 * @author yanpi
 */
public class Imagen {
    private int id;
    private String url;
    private String descripcion;
    
    public Imagen(String url, String descripcion){
        this.url = url;
        this.descripcion = descripcion;
    }
}

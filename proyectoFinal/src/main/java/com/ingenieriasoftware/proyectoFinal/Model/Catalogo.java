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
public class Catalogo {
    private String filtros;
    private boolean ordenamiento;
    private List<Estampa> listaEstampas;
    
    public Catalogo(Estampa estampa){
        this.listaEstampas = new ArrayList();
        this.listaEstampas.add(estampa);
    }
    
    public List<Estampa> buscarEstampa(){
        return null;
    }
    
    public Estampa actualizarEstampa(){
        return null;
    }
}

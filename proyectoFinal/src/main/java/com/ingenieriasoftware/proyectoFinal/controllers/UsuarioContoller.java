/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ingenieriasoftware.proyectoFinal.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author yanpi
 */
@RestController
@RequestMapping("/UsuarioController")
public class UsuarioContoller {
       
    @GetMapping("/hola")
    public String holaMundo(){
        return "Hola Mundo";
    }
}

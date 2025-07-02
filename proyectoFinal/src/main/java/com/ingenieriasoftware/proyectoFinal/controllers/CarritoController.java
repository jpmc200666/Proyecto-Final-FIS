package com.ingenieriasoftware.proyectoFinal.controllers;


import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jona
 */
@RestController
@RequestMapping("/carrito")
public class CarritoController {

    @Autowired
    private ICarritoService carritoService;



}

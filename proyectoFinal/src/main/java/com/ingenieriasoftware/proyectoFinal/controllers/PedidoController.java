package com.ingenieriasoftware.proyectoFinal.controllers;

import com.ingenieriasoftware.proyectoFinal.dtos.ReqPagoDTO;
import com.ingenieriasoftware.proyectoFinal.models.Pedido;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.IPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pago")
public class PedidoController {

    @Autowired
    private IPagoService pagoService;

    @PostMapping("crear-pago")
    public ResponseEntity<?> crearPago(@RequestBody ReqPagoDTO reqPagoDTO){

        Pedido pedido = pagoService.pagarPedido(reqPagoDTO.getIdPedido());

        if(pedido!=null) return ResponseEntity.ok(pedido);

        //TODO agregar los demas manejadores de errores
        return ResponseEntity.internalServerError().body("El pago no existe");

    }

}

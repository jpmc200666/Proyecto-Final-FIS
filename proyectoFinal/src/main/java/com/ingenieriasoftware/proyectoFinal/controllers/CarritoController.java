package com.ingenieriasoftware.proyectoFinal.controllers;


import com.ingenieriasoftware.proyectoFinal.dtos.ReqItemCarritoDTO;
import com.ingenieriasoftware.proyectoFinal.models.Carrito;
import com.ingenieriasoftware.proyectoFinal.models.ItemCarrito;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author jona
 */
@RestController
@RequestMapping("/carrito")
public class CarritoController {

    @Autowired
    private ICarritoService carritoService;

    @GetMapping("active-by-cliente")
    private ResponseEntity<Carrito> getActiveCarritoByIdCliente(@RequestParam Long idCliente){
        Carrito carrito = carritoService.getActiveByUser(idCliente);
        if (carrito != null)return ResponseEntity.ok(carrito);
        return ResponseEntity.internalServerError().build();
    }

    @PostMapping("add-item-carrito")
    private ResponseEntity<?> createItemCarrito(@RequestBody ReqItemCarritoDTO reqItemCarritoDTO){

        if(reqItemCarritoDTO.getCantidad() > 0){
            ItemCarrito itemCarrito = carritoService.agregarItemCarrito(reqItemCarritoDTO.getIdCarrito(), reqItemCarritoDTO.getIdCamisetaEstampada(), reqItemCarritoDTO.getCantidad());

            if (itemCarrito != null) return ResponseEntity.ok(itemCarrito);

            //TODO Validar los otros errores
            return ResponseEntity.internalServerError().body(String.format("El carrito %s o La camisetaEstampada %s no existen", reqItemCarritoDTO.getIdCarrito(), reqItemCarritoDTO.getIdCamisetaEstampada()));
        }

        return ResponseEntity.internalServerError().body("La cantidad debe ser mayo a 0");
    }

}

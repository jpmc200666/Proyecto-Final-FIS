package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaEstampadaDTO;
import com.ingenieriasoftware.proyectoFinal.models.*;
import com.ingenieriasoftware.proyectoFinal.repositories.CarritoRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.ClienteRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.ItemCarritoRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.PedidoRepository;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Service
public class CarritoServiceImpl implements ICarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private ItemCarritoRepository itemCarritoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CamisetaEstampadaServiceImp camisetaEstampadaService;

    /**
     * Retornamos el carrito activo (si existe) para el cliente seleccionadado
     * Si el pedido no existe, creamos un nuevo pedido
     * @param clientId  id del cliente
     * @return Carrito
     */
    @Override
    public Carrito getActiveByUser(Long clientId) {

        /**
         * Debe existir un carrito por pedido
         * La relacion con cliente se realiza en pedido
         * Buscamos el pedido activo del cliente enviado (solo debe existir un pedido activo)
         */
        Optional<Pedido> pedidoOptional = pedidoRepository.findByClienteAndEstado(clientId, "AC");
        if (pedidoOptional.isPresent()) return pedidoOptional.get().getCarrito();

        /**
         * Si no existe, creamos un pedido y un carrito nuevo
         */
        else{

            Optional<Cliente> clienteOpt = clienteRepository.findById(clientId);

            if(clienteOpt.isPresent()){
                Carrito nuevoCarrito = Carrito.builder()
                        .fechaCreacion(new Date())
                        .vigencia(300)
                        .totalCarrito(BigDecimal.ZERO)
                        .build();

                carritoRepository.save(nuevoCarrito);

                Pedido nuevoPedido = Pedido.builder()
                        .fecha(LocalDate.now())
                        .estado("AC")
                        .carrito(nuevoCarrito)
//                    .pago(pago)
                        .cliente(clienteOpt.get())
                        .build();

                pedidoRepository.save(nuevoPedido);

                return nuevoCarrito;
            }
            /**
             * @TODO Crear el manejador de error para esto
             */
            else System.out.println("El cliente no existe");
        }

//        carritoRepository.
        return null;
    }

    /**
     * Agregamos un item carrito (relacion entre carriot y camiseta estampada)
     * @param idCarrito             id del carrito del ususario
     * @param idCamisetaEstampada   id de la camiseta estampada a agregar
     * @param cantidad              cantidad de camisetas a comprar
     * @return                      ItemCarrito
     */
    public ItemCarrito agregarItemCarrito(Long idCarrito, Long idCamisetaEstampada, int cantidad){

        Carrito carrito = findById(idCarrito);
        CamisetaEstampada camisetaEstampada = camisetaEstampadaService.findById(idCamisetaEstampada);

        if(carrito != null && camisetaEstampada != null){
            ItemCarrito itemCarrito = ItemCarrito.builder()
                    .carrito(carrito)
                    .camisetaEstampada(camisetaEstampada)
                    .cantidad(cantidad)
                    .build();

            //Guardamos el item carrito
            itemCarritoRepository.save(itemCarrito);

            //Actualizamos el total del carrito de compras
            BigDecimal precioCarrito = carrito.getTotalCarrito().add(BigDecimal.valueOf(camisetaEstampada.getPrecioCamiseta()));
            carrito.setTotalCarrito(precioCarrito);
            carritoRepository.save(carrito);

            return itemCarrito;
        }

        System.out.println(String.format("El carrito %s o La camisetaEstampada %s no existen", idCarrito, idCamisetaEstampada));
        return null;
    }

    /**
     * Buscamos un Carrito por su id
     * @param id    idCarrito
     * @return      obj Carrito
     */
    @Override
    public Carrito findById(Long id) {
        Optional<Carrito> optionalCarrito = carritoRepository.findById(id);
        if (optionalCarrito.isPresent()) return optionalCarrito.get();
        System.out.println(String.format("El carrito %s no existe", id));
        return null;
    }
}

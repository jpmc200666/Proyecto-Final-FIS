package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.models.Pago;
import com.ingenieriasoftware.proyectoFinal.models.Pedido;
import com.ingenieriasoftware.proyectoFinal.repositories.PagoRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.PedidoRepository;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.IPagoService;
import com.ingenieriasoftware.proyectoFinal.util.constant.MetodoPagoEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class PagoServiceImpl implements IPagoService {

    @Autowired
    private PagoRepository pagoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    @Override
    public Pago createPago(Pedido pedido) {
        System.out.println("Creando pago para el pedido: " + pedido.getId());
        //Creamos el pago
        Pago pago = Pago.builder()
                .metodosPago(null)  //TODO quemado  //TODO esta generando error el enum en el insert a la db
                .cedula(12345L) //TODO quemado
                .fechaTransaccion(new Date())
                .pedido(pedido)
                .estado("PE")
                .nombre("ADMIN") //TODO quemado
                .plataforma("OWN_SYSTEM") //TODO quemado
                .build();

        /**
         * Se supone realizamos todo el proceso transaccional
         */
        //Luego un evento desencadenaria la actualización de la transacion en una nueva funcion
        pago.setEstado("PG");   //pago
        pago.setIdTransaccion(UUID.randomUUID().toString());    //id del protal transaccional


        //guardamos pago
        pagoRepository.save(pago);

        System.out.println("Pago creado: " + pago.getId());

        return pago;
    }


    @Override
    public Pedido actualizarPedido(Pedido pedido) {

        System.out.println("Actualizando pedido: " + pedido.getId());
        //Actualizamos el pedido
        pedido.setEstado("PG");
        return pedidoRepository.save(pedido);
    }

    /**
     * Buscamos un pedido por su id
     * @param id
     * @return  pedido / pedido=null no se encontro
     */
    @Override
    public Pedido findById(Long id) {
        Optional<Pedido> optionalPago = pedidoRepository.findById(id);
        return optionalPago.orElse(null);
    }

    /**
     * Creamos un pago y actualizamos el esttado del pedido a pago
     * @param idPedido
     * @return  pedido
     */
    @Override
    public Pedido pagarPedido(Long idPedido) {

        Pedido pedido = findById(idPedido);

        if (pedido!=null){

            createPago(pedido);

            pedido = actualizarPedido(pedido);

            return pedido;
        }

        return null;
    }
}

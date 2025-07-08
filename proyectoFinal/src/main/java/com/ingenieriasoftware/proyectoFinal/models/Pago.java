package com.ingenieriasoftware.proyectoFinal.models;

import com.ingenieriasoftware.proyectoFinal.util.constant.MetodoPagoEnum;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="pago")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;

    @Column(nullable = false)
    private Long cedula;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodos_pago")
    private MetodoPagoEnum metodosPago;

    @Column(name="id_transaccion")
    private String idTransaccion;

    @OneToOne(targetEntity = Pedido.class)
    private Pedido pedido;

    @Column(name="fecha_transaccion", columnDefinition = "DATE", nullable = false)
    private Date fechaTransaccion;

    private String estado;
    private String plataforma;
}

package com.ingenieriasoftware.proyectoFinal.persistence.entities;

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

    @Column(nullable = false,unique = true)
    private int cedula;
    private EnumType metodosPago;

    @Column(name="id_transaccion", updatable=false, nullable=false)
    private String idTransaccion;

    @OneToOne(targetEntity = Pedido.class)
    private Pedido pedido;

    @Column(name="fecha_transaccion", columnDefinition = "DATE", nullable = false)
    private Date fechaTransaccion;
    private String estado;
    private String plataforma;
}

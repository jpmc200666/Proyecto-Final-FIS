package com.ingenieriasoftware.proyectoFinal.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fecha;
    private String estado;

    @OneToOne(targetEntity = Carrito.class)
    private Carrito carrito;

    @OneToOne(targetEntity = Pago.class)
    private Pago pago;

    @JsonIgnore
    @ManyToOne(targetEntity = Cliente.class)
    private Cliente cliente;

}

package com.ingenieriasoftware.proyectoFinal.models;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_creacion",columnDefinition = "DATE")
    private Date fechaCreacion;
    private int vigencia;
    private BigDecimal totalCarrito;

    @OneToMany(targetEntity = ItemCarrito.class, fetch = FetchType.LAZY, mappedBy = "carrito")
    private List<ItemCarrito> elementosCarrito;

}

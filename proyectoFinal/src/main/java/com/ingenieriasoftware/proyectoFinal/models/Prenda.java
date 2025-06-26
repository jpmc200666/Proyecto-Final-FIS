package com.ingenieriasoftware.proyectoFinal.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="prenda")
public class Prenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(targetEntity = Stock.class)
    private Stock stock;

    @ManyToOne(targetEntity = ItemCarrito.class)
    private ItemCarrito itemCarrito;
}

package com.ingenieriasoftware.proyectoFinal.persistence.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="item_carrito")
public class ItemCarrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="item_id")
    private Integer itemId;

    private int cantidad;

    @OneToMany(targetEntity = Prenda.class, cascade = CascadeType.ALL, mappedBy = "itemCarrito")
    private List<Prenda> prenda;

    @ManyToOne(targetEntity = Carrito.class)
    private Carrito carrito;

}

package com.ingenieriasoftware.proyectoFinal.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name="id")
    private Long id;

    private int cantidad;

    @OneToMany(targetEntity = CamisetaEstampada.class, cascade = CascadeType.ALL, mappedBy = "itemCarrito")
    private List<CamisetaEstampada> camisetaEstampadas;

    @JsonIgnore
    @ManyToOne(targetEntity = Carrito.class)
    private Carrito carrito;

}

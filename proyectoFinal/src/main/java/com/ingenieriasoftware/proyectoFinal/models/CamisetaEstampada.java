package com.ingenieriasoftware.proyectoFinal.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="camiseta_estampada")
public class CamisetaEstampada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double precioCamiseta;

    // RELACIÓN CORRECTA: OneToMany a tu entidad de unión PropsEstampaAplicada
    // que ahora maneja la clave compuesta.
    @OneToMany(mappedBy = "camisetaEstampada", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PropsEstampaAplicada> propsEstampasAplicadas = new HashSet<>();
    // Usamos Set porque las relaciones OneToMany/ManyToMany suelen ser colecciones de Set o List.
    // El "map" de tu DTO de entrada se gestionará en el servicio, no directamente en la entidad aquí.

    @JsonIgnore
    @ManyToOne(targetEntity = Camiseta.class)
    private Camiseta camiseta;

    @JsonIgnore
    @OneToMany(targetEntity = ItemCarrito.class, cascade = CascadeType.ALL, mappedBy = "camisetaEstampada")
    private List<ItemCarrito> itemsCarrito;

}
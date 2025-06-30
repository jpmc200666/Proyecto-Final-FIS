package com.ingenieriasoftware.proyectoFinal.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int capacidad;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Evitar ciclos si usas Jackson
    private List<Camiseta> camisetas;

    @Column(name = "fecha_ultima_actualizacion", columnDefinition = "DATE", nullable = false)
    private Date fechaUltimaActualizacion;

    /**
     * El artista no tiene pertenencia con stock
     */
//    @OneToOne (targetEntity = Artista.class)
//    private Artista artista;

    @OneToMany(targetEntity = Proveedor.class, fetch = FetchType.LAZY, mappedBy = "stock")
    private List<Proveedor> proveedores;





}

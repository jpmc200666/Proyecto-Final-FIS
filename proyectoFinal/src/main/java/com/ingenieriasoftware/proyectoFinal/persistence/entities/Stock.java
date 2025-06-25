package com.ingenieriasoftware.proyectoFinal.persistence.entities;

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

    @OneToMany(targetEntity = Prenda.class, fetch = FetchType.LAZY, mappedBy = "stock")
    private List<Prenda> prendas;

    @Column(name = "fecha_ultima_actualizacion", columnDefinition = "DATE", nullable = false)
    private Date fechaUltimaActualizacion;

    @OneToOne (targetEntity = Artista.class)
    private Artista artista;

    @OneToMany(targetEntity = Proveedor.class, fetch = FetchType.LAZY, mappedBy = "stockArtista")
    private List<Proveedor> proveedores;





}

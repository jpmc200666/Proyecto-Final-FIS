package com.ingenieriasoftware.proyectoFinal.persistence.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="artista")
public class Artista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name="fecha_registro", columnDefinition = "DATE", nullable = false)
    private LocalDate fechaRegistro;

    @OneToMany(targetEntity = Estampa.class, fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, mappedBy = "artista")
    private List<Estampa> estampasPublicadas;

    @OneToOne(targetEntity = Catalogo.class, cascade = CascadeType.REMOVE)
    @JoinColumn(name="id_catalogo")
    private Catalogo catalogo;

    @Column(name = "ganancias_totales")
    private int gananciasTotales;

    @OneToOne(targetEntity = Stock.class, cascade = CascadeType.REMOVE)
    private Stock stock;

    @ManyToOne(targetEntity = Administrador.class)
    private Administrador administrador;




}

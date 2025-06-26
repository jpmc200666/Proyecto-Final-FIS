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
@Table(name="estampa")
public class Estampa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;

    @Column(nullable = false)
    private BigDecimal precioBase;
    private int rating;
    private String tema;

    @Column(name = "fecha_publicacion", columnDefinition = "DATE")
    private Date fechaPublicacion;

    @Column(columnDefinition = "BOOLEAN")
    private boolean estado;

    @OneToMany(targetEntity = Imagen.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "estampa")
    private List<Imagen> imagenes;

    @ManyToOne(targetEntity = Artista.class)
    private Artista artista;

    @ManyToOne(targetEntity = Catalogo.class)
    private Catalogo catalogo;
}

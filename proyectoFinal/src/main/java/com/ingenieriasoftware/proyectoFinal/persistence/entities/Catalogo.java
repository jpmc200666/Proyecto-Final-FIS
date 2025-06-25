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
@Table(name="catologo")
public class Catalogo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;

    @Column(name = "fecha_creacion", columnDefinition = "DATE")
    private LocalDate fechaCreacion;

    @OneToMany(targetEntity = Estampa.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "catalogo")
    private List<Estampa> estampas;
}

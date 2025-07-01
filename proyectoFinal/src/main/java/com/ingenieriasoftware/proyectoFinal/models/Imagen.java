package com.ingenieriasoftware.proyectoFinal.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="imagen")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private String descripcion;

    @ManyToOne(targetEntity = Estampa.class)
    @JsonIgnore // Ignorar la serialización de esta relación para evitar ciclos
    private Estampa estampa;
}

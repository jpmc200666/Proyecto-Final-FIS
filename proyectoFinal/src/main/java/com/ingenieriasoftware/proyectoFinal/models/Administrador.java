package com.ingenieriasoftware.proyectoFinal.models;

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
@Table(name="administrador")
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name="fecha_registro", columnDefinition = "DATE")
    private LocalDate fechaRegistro;

    @OneToMany(targetEntity = Artista.class, fetch = FetchType.LAZY, mappedBy = "administrador")
    private List<Artista> artistas;

    @OneToMany(targetEntity = Cliente.class, fetch = FetchType.LAZY, mappedBy = "administrador")
    private List<Cliente> clientes;

}

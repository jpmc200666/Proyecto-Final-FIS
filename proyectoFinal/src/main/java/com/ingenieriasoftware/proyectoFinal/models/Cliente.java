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
@Table(name="cliente")
public class Cliente {

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

    @OneToMany(targetEntity = Pedido.class, fetch = FetchType.LAZY, mappedBy = "cliente")
    private List<Pedido> pedidos;

    @ManyToOne(targetEntity = Administrador.class)
    private Administrador administrador;


}

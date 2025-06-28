package com.ingenieriasoftware.proyectoFinal.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="cliente")
public class Cliente extends Usuario {

    @OneToMany(targetEntity = Pedido.class, fetch = FetchType.LAZY, mappedBy = "cliente")
    private List<Pedido> pedidos;

    @ManyToOne(targetEntity = Administrador.class)
    private Administrador administrador;


}

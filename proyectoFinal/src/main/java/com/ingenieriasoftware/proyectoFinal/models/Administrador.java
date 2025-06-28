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
@Table(name="administrador")
public class Administrador extends Usuario{

    @OneToMany(targetEntity = Artista.class, fetch = FetchType.LAZY, mappedBy = "administrador")
    private List<Artista> artistas;

    @OneToMany(targetEntity = Cliente.class, fetch = FetchType.LAZY, mappedBy = "administrador")
    private List<Cliente> clientes;

}

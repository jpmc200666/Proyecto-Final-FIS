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
@Table(name="artista")
public class Artista extends Usuario{

    public Artista(UsuarioBuilder<?, ?> b) {
        super(b);
    }

    /**
     * La relacionn con estampa la realizamos a travez del catalogo
     */
//    @OneToMany(targetEntity = Estampa.class, fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, mappedBy = "artista")
//    private List<Estampa> estampasPublicadas;

    @OneToOne(targetEntity = Catalogo.class, cascade = CascadeType.REMOVE)
    @JoinColumn(name="id_catalogo")
    private Catalogo catalogo;

    @Column(name = "ganancias_totales")
    private int gananciasTotales;

    /**
     * El artista no interactua con el stock
     */
//    @OneToOne(targetEntity = Stock.class, cascade = CascadeType.REMOVE)
//    private Stock stock;

    @ManyToOne(targetEntity = Administrador.class)
    private Administrador administrador;




}

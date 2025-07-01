package com.ingenieriasoftware.proyectoFinal.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashMap;
import java.util.Map;



@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="camiseta_estampada")
public class CamisetaEstampada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne(targetEntity = Estampa.class)
//    private Estampa estampa;

    /** Key = Estampa  |  Value = Props de esa estampa */
    @ElementCollection
    @CollectionTable(
            name = "camiseta_estampada_estampas",
            joinColumns = @JoinColumn(name = "camiseta_estampada_id")
    )
    @MapKeyJoinColumn(name = "estampa_id")    // FK a ESTAMPA
    private Map<Estampa, PropsEstampaAplicada> estampasAplicadas = new HashMap<>();

    @ManyToOne(targetEntity = Camiseta.class)
    private Camiseta camiseta;

    @ManyToOne(targetEntity = ItemCarrito.class)
    private ItemCarrito itemCarrito;

}

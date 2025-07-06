package com.ingenieriasoftware.proyectoFinal.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashMap;
import java.util.List;
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

    private Double precioCamiseta;

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

    @JsonIgnore
    @ManyToOne(targetEntity = Camiseta.class)
    private Camiseta camiseta;

    @JsonIgnore
    @OneToMany(targetEntity = ItemCarrito.class, cascade = CascadeType.ALL, mappedBy = "camisetaEstampada")
    private List<ItemCarrito> itemsCarrito;

}

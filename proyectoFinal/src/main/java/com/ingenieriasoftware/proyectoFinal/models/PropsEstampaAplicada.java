package com.ingenieriasoftware.proyectoFinal.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="props_estampada_aplicada")
public class PropsEstampaAplicada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float coordX;
    private float coordY;
    private float tamano;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "camiseta_estampada_id")
    private CamisetaEstampada camisetaEstampada;

}

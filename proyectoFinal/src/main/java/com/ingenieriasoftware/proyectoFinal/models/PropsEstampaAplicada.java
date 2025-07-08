package com.ingenieriasoftware.proyectoFinal.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="camiseta_estampada_estampas") // ¡IMPORTANTE! El nombre de la tabla debe ser EXACTAMENTE este
public class PropsEstampaAplicada {

    @EmbeddedId // Indica que la clave primaria es compuesta y está incrustada
    private PropsEstampaAplicadaId id; // Usamos la clase de ID compuesta

    // El 'id' original de PropsEstampaAplicada ahora es una columna normal
    @Column(name = "estampas_aplicadas_id")
    private Long estampasAplicadasId;

    private float coordX;
    private float coordY;
    private float tamano;

    // Relación a CamisetaEstampada: Usamos @MapsId para mapear parte de la clave compuesta
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("camisetaEstampadaId") // Mapea 'camisetaEstampadaId' de PropsEstampaAplicadaId a esta relación
    @JoinColumn(name = "camiseta_estampada_id") // Columna FK en esta tabla (parte de la PK compuesta)
    private CamisetaEstampada camisetaEstampada;

    // Relación a Estampa: Usamos @MapsId para mapear parte de la clave compuesta
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("estampaId") // Mapea 'estampaId' de PropsEstampaAplicadaId a esta relación
    @JoinColumn(name = "estampa_id") // Columna FK en esta tabla (parte de la PK compuesta)
    private Estampa estampa;

    // Constructor de conveniencia (Lombok @Builder y @AllArgsConstructor pueden manejar esto)
    // Pero si necesitas uno específico para tu lógica, aquí tienes un ejemplo:
    // public PropsEstampaAplicada(PropsEstampaAplicadaId id, Long estampasAplicadasId, float coordX, float coordY, float tamano) {
    //     this.id = id;
    //     this.estampasAplicadasId = estampasAplicadasId;
    //     this.coordX = coordX;
    //     this.coordY = coordY;
    //     this.tamano = tamano;
    // }
}
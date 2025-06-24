package com.ingenieriasoftware.proyectoFinal.persistence.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="proveedor")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_proveedor", unique = true, nullable = false)
    private String nombreProveedor;

    @Column(name = "tiempo_entrega_estimado", nullable = false)
    private int tiempoEntregaEstimado;

    @Column(name = "cantidad_disponible", nullable = false)
    private int cantidadDisponible;

    @ManyToOne(targetEntity = Stock.class)
    private Stock stockArtista;
}

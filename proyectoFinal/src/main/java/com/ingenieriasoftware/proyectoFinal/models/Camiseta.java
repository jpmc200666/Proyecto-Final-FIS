package com.ingenieriasoftware.proyectoFinal.models;

import com.ingenieriasoftware.proyectoFinal.util.constant.TallaEnum;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="camiseta")
public class Camiseta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String color;
    @Enumerated(EnumType.STRING)
    private TallaEnum talla;
    private String material;

    private Double precio;

    private String urlImagen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

}

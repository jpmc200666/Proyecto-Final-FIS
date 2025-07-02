package com.ingenieriasoftware.proyectoFinal.dtos;

import com.ingenieriasoftware.proyectoFinal.models.Camiseta;
import com.ingenieriasoftware.proyectoFinal.models.Estampa;
import com.ingenieriasoftware.proyectoFinal.models.ItemCarrito;
import com.ingenieriasoftware.proyectoFinal.models.PropsEstampaAplicada;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CamisetaEstampadaDTO {

    private Long id;

    private Map<Long, PropsEstampaAplicada> estampasAplicadas;

    private Camiseta camiseta;

    private ItemCarrito itemCarrito;
}

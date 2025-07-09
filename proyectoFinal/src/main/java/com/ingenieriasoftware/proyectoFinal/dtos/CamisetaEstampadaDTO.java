package com.ingenieriasoftware.proyectoFinal.dtos;

// Importa el DTO de Camiseta
import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaDTO;
import com.ingenieriasoftware.proyectoFinal.models.Estampa; // Necesario para el DTO de PropsEstampaAplicada
import com.ingenieriasoftware.proyectoFinal.models.PropsEstampaAplicada; // Necesario para el Map
import java.util.Map;

public class CamisetaEstampadaDTO {

    private Long id;
    private Map<Long, PropsEstampaAplicadaDTO> estampasAplicadas;

    // ¡CAMBIO CLAVE AQUÍ! Usa CamisetaDTO en lugar de Camiseta
    private CamisetaDTO camiseta;

    private Double precioCamiseta;

    // Getters y Setters y Constructor sin Lombok
    public CamisetaEstampadaDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Map<Long, PropsEstampaAplicadaDTO> getEstampasAplicadas() { return estampasAplicadas; }
    public void setEstampasAplicadas(Map<Long, PropsEstampaAplicadaDTO> estampasAplicadas) { this.estampasAplicadas = estampasAplicadas; }

    // ¡ACTUALIZA EL TIPO DEL GETTER Y SETTER TAMBIÉN!
    public CamisetaDTO getCamiseta() { return camiseta; }
    public void setCamiseta(CamisetaDTO camiseta) { this.camiseta = camiseta; }

    public Double getPrecioCamiseta() { return precioCamiseta; }
    public void setPrecioCamiseta(Double precioCamiseta) { this.precioCamiseta = precioCamiseta; }
}

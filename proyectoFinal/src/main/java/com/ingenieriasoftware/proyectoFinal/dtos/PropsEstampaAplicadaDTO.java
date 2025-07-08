package com.ingenieriasoftware.proyectoFinal.dtos;

// Si usas Lombok en los DTOs
// import lombok.*;

public class PropsEstampaAplicadaDTO {

    private Long id; // Opcional, si el id de la PropsEstampaAplicada se genera en BD
    private Double coordX;
    private Double coordY;
    private Double tamano;
    private Long estampaId; // ¡Esto es lo que necesitas para el ID de la estampa!

    // Getters y Setters y Constructor sin Lombok
    public PropsEstampaAplicadaDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getCoordX() { return coordX; }
    public void setCoordX(Double coordX) { this.coordX = coordX; }

    public Double getCoordY() { return coordY; }
    public void setCoordY(Double coordY) { this.coordY = coordY; }

    public Double getTamano() { return tamano; }
    public void setTamano(Double tamano) { this.tamano = tamano; }

    public Long getEstampaId() { return estampaId; }
    public void setEstampaId(Long estampaId) { this.estampaId = estampaId; }
}
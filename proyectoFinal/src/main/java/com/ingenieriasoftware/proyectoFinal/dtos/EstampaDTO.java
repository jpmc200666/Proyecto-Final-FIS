package com.ingenieriasoftware.proyectoFinal.dtos;


import com.ingenieriasoftware.proyectoFinal.models.Catalogo;
import com.ingenieriasoftware.proyectoFinal.models.Imagen;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * DTO (Data Transfer Object) para representar los datos de una camiseta.
 * Se utiliza para transferir información de la camiseta entre capas de la aplicación.
 */
@Data // Genera automáticamente los métodos getter, setter, equals, hashCode y toString.
@Builder // Permite construir instancias de la clase utilizando el patrón Builder.
@AllArgsConstructor // Genera un constructor con todos los atributos como parámetros.
@NoArgsConstructor // Genera un constructor sin parámetros.
public class EstampaDTO {

    private Long id;

    private String nombre;

    private String descripcion;

    private BigDecimal precioBase;

    private int rating;

    private String tema;

    private Date fechaPublicacion;

    private boolean estado;

    private List<Imagen> imagenes;

    private Catalogo catalogo;

}

package com.ingenieriasoftware.proyectoFinal.dtos;

import com.ingenieriasoftware.proyectoFinal.models.Stock;
import com.ingenieriasoftware.proyectoFinal.util.constant.TallaEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) para representar los datos de una camiseta.
 * Se utiliza para transferir información de la camiseta entre capas de la aplicación.
 */
@Data // Genera automáticamente los métodos getter, setter, equals, hashCode y toString.
@Builder // Permite construir instancias de la clase utilizando el patrón Builder.
@AllArgsConstructor // Genera un constructor con todos los atributos como parámetros.
@NoArgsConstructor // Genera un constructor sin parámetros.
public class CamisetaDTO {

    private int id;

    private String color;

    private TallaEnum talla;

    private String material;

    private Double precio;

    private String urlImagen;

    private Stock stock;
}

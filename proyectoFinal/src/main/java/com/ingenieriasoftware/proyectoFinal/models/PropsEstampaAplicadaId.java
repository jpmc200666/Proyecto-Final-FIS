package com.ingenieriasoftware.proyectoFinal.models;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Getter; // Asegúrate de importar Getter
import lombok.Setter; // Asegúrate de importar Setter

import java.io.Serializable;

@Embeddable // Indica que esta clase es incrustable como parte de la clave primaria
@AllArgsConstructor // Genera un constructor con todos los argumentos
@NoArgsConstructor // Genera un constructor sin argumentos
@EqualsAndHashCode // Genera automáticamente equals() y hashCode() (NECESARIO para claves compuestas)
@Getter // Añadido para que Lombok genere los getters
@Setter // Añadido para que Lombok genere los setters
public class PropsEstampaAplicadaId implements Serializable {

    private static final long serialVersionUID = 1L; // Recomendado para Serializable

    // Estos nombres de campos deben coincidir con los nombres de las columnas
    // que forman la clave primaria compuesta en la tabla 'camiseta_estampada_estampas'.
    private Long camisetaEstampadaId;
    private Long estampaId;

}
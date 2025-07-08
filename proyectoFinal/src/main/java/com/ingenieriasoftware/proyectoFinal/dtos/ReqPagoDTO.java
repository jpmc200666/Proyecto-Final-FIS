package com.ingenieriasoftware.proyectoFinal.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Genera automáticamente los métodos getter, setter, equals, hashCode y toString.
@Builder // Permite construir instancias de la clase utilizando el patrón Builder.
@AllArgsConstructor // Genera un constructor con todos los atributos como parámetros.
@NoArgsConstructor // Genera un constructor sin parámetros.
public class ReqPagoDTO {
    private Long idPedido;

}

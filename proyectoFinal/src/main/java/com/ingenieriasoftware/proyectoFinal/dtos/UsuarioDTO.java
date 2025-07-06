package com.ingenieriasoftware.proyectoFinal.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) para representar los datos de un usuario.
 * Se utiliza para transferir información del usuario entre capas de la aplicación.
 */
@Data // Genera automáticamente los métodos getter, setter, equals, hashCode y toString.
@Builder // Permite construir instancias de la clase utilizando el patrón Builder.
@AllArgsConstructor // Genera un constructor con todos los atributos como parámetros.
@NoArgsConstructor // Genera un constructor sin parámetros.
public class UsuarioDTO {

    // Primer nombre del usuario.
    String nombre;

    // Contraseña del usuario.
    String password;

    // Correo electrónico del usuario.
    String email;

    String rol;
}

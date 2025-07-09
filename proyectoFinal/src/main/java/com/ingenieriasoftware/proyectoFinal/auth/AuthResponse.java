package com.ingenieriasoftware.proyectoFinal.auth;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa la respuesta de autenticación.
 * Contiene los datos relevantes del usuario autenticado y el token de acceso.
 */
@Data // Genera automáticamente los métodos getter, setter, equals, hashCode y toString.
@Builder // Permite construir instancias de la clase utilizando el patrón Builder.
@AllArgsConstructor // Genera un constructor con todos los atributos como parámetros.
@NoArgsConstructor // Genera un constructor sin parámetros.
public class AuthResponse {

    Long id;
    // Token de acceso generado tras la autenticación.
    String token;

    // Segundo apellido del usuario.
    String nombre;

    //Email
    String email;

//    // Estado de actividad del usuario (activo/inactivo).
//    Boolean isActive;

    // Lista de roles asignados al usuario.
    List<String> roles;

}

package com.ingenieriasoftware.proyectoFinal.auth;

import com.ingenieriasoftware.proyectoFinal.dtos.UsuarioDTO;
import com.ingenieriasoftware.proyectoFinal.error.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.ingenieriasoftware.proyectoFinal.error.InternalServerErrorResponse;

@RestController // Declara esta clase como un controlador REST para manejar solicitudes HTTP.
@RequestMapping("/auth") // Define la ruta base "/auth" para las solicitudes relacionadas con autenticación.
@RequiredArgsConstructor // Genera un constructor para las dependencias finales definidas en la clase.
public class AuthController {

    // Servicio de autenticación inyectado a través de RequiredArgsConstructor.
    @Autowired
    private AuthService authService;

    /**
     * Endpoint para iniciar sesión en el sistema.
     *
     * TODO Validar el # de intentos
     *
     * @param request Un objeto LoginRequest que contiene las credenciales del usuario.
     * @return Una respuesta HTTP con el resultado de la autenticación.
     */
    @PostMapping("/login") // Define un endpoint POST en la ruta "/login".
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Llama al servicio de autenticación para validar las credenciales del usuario.
            return ResponseEntity.ok(authService.login(request));
        } catch (ResponseException e) {
            // Maneja excepciones personalizadas relacionadas con errores en el servicio de autenticación.
            switch (e.getStatusCode()) {
                case 404: // Retorna un error 404 si el usuario no es encontrado.
                    return ResponseEntity.status(404).body(InternalServerErrorResponse.builder()
                            .statusCode(404)
                            .message("Usuario no encontrado")
                            .build());
                default: // Retorna un error 500 para cualquier otro error desconocido.
                    return ResponseEntity.internalServerError().body(InternalServerErrorResponse.builder()
                            .statusCode(500)
                            .message("Ocurrió un error desconocido")
                            .build());
            }
        } catch (AuthenticationException e) {
            // Maneja excepciones de autenticación, como contraseñas incorrectas.
            return ResponseEntity.status(403).body(InternalServerErrorResponse.builder()
                    .statusCode(403)
                    .message("Contraseña incorrecta")
                    .build());
        }
    }

    /**
     * TODO Responder cuando el usuario ya este registrado
     * TODO Agregar roles
     * @param request
     * @return
     */
    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<?> createUsuario(@RequestBody UsuarioDTO request) {
        RegisterResponse res = authService.create(request);
        if (res.getStatusCode() != 200) {
            return ResponseEntity.internalServerError().body(res);
        }
        return ResponseEntity.ok(res);
    }

    /**
     * TODO Agregar función para bloquear usuario
     */
}

package com.ingenieriasoftware.proyectoFinal.repositories;

import com.ingenieriasoftware.proyectoFinal.models.Usuario;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

    /**
     * Busca un usuario por su correo electrónico.
     *
     * @param email El correo electrónico del usuario.
     * @return Un Optional que contiene el usuario si se encuentra.
     */
    Optional<Usuario> findByEmail(String email);

    /**
     * Verifica si existe un usuario con el correo electrónico especificado.
     *
     * @param email El correo electrónico del usuario.
     * @return true si existe un usuario con el correo, de lo contrario false.
     */
    boolean existsByEmail(String email);

}

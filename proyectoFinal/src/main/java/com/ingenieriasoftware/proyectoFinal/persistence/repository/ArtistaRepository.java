package com.ingenieriasoftware.proyectoFinal.persistence.repository;

import com.ingenieriasoftware.proyectoFinal.persistence.entities.Artista;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistaRepository extends CrudRepository<Artista, Long> {
}

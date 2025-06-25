package com.ingenieriasoftware.proyectoFinal.persistence.repository;

import com.ingenieriasoftware.proyectoFinal.persistence.entities.Imagen;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenRepository extends CrudRepository<Imagen, Long> {
}

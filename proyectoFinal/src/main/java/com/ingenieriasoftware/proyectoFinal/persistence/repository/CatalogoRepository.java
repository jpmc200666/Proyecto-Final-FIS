package com.ingenieriasoftware.proyectoFinal.persistence.repository;

import com.ingenieriasoftware.proyectoFinal.persistence.entities.Catalogo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogoRepository extends CrudRepository<Catalogo, Long> {
}

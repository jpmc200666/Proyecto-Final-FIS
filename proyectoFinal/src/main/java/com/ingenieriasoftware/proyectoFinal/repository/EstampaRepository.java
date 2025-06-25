package com.ingenieriasoftware.proyectoFinal.persistence.repository;

import com.ingenieriasoftware.proyectoFinal.persistence.entities.Estampa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstampaRepository extends CrudRepository<Estampa, Long> {
}

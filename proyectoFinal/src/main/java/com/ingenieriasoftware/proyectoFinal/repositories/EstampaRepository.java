package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.Estampa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Repositorio para gestionar operaciones CRUD en la entidad { Estampa }.

@Repository
public interface EstampaRepository extends CrudRepository<Estampa, Long> {
}

package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.Administrador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Repositorio para gestionar operaciones CRUD en la entidad { Administrador }.

@Repository
public interface AdministradorRepository extends CrudRepository<Administrador, Long> {
}

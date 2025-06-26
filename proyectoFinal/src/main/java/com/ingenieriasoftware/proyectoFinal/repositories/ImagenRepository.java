package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.Imagen;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Repositorio para gestionar operaciones CRUD en la entidad { Imagen }.

@Repository
public interface ImagenRepository extends CrudRepository<Imagen, Long> {
}

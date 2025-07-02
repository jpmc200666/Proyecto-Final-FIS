package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Repositorio para gestionar operaciones CRUD en la entidad { Carrito }.

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {

//    Optional<Carrito> findBy

}

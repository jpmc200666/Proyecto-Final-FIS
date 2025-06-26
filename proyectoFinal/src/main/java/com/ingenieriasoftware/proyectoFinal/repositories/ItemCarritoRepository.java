package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.ItemCarrito;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Repositorio para gestionar operaciones CRUD en la entidad { ItemCarrito }.

@Repository
public interface ItemCarritoRepository extends CrudRepository<ItemCarrito, Long> {
}

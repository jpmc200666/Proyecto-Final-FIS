package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Repositorio para gestionar operaciones CRUD en la entidad { Cliente }.

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Long> {
}

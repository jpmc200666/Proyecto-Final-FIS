package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.Cliente;
import com.ingenieriasoftware.proyectoFinal.models.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Repositorio para gestionar operaciones CRUD en la entidad { Cliente }.

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

//    Optional<Cliente> findById(@Param("id") Long id);

}

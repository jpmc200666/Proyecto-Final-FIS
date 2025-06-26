package com.ingenieriasoftware.proyectoFinal.repositories;


import com.ingenieriasoftware.proyectoFinal.models.Pedido;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Repositorio para gestionar operaciones CRUD en la entidad { Pedido }.

@Repository
public interface PedidoRepository extends CrudRepository<Pedido, Long> {
}

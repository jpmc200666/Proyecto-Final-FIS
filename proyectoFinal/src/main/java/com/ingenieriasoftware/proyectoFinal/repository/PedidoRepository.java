package com.ingenieriasoftware.proyectoFinal.persistence.repository;

import com.ingenieriasoftware.proyectoFinal.persistence.entities.Pedido;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends CrudRepository<Pedido, Long> {
}

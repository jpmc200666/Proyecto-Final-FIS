package com.ingenieriasoftware.proyectoFinal.repositories;

import com.ingenieriasoftware.proyectoFinal.models.CamisetaEstampada;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CamisetaEstampadaRepository extends CrudRepository<CamisetaEstampada, Long>{
}

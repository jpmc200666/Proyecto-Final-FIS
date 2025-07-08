package com.ingenieriasoftware.proyectoFinal.repositories;

import com.ingenieriasoftware.proyectoFinal.models.PropsEstampaAplicada;
import com.ingenieriasoftware.proyectoFinal.models.PropsEstampaAplicadaId;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Set; // O List, según tu preferencia

public interface PropsEstampaAplicadaRepository extends JpaRepository<PropsEstampaAplicada, PropsEstampaAplicadaId> {
    // Método para encontrar todas las PropsEstampaAplicada por el ID de la camiseta estampada.
    // La sintaxis 'findByIdCamisetaEstampadaId' es para acceder al campo 'camisetaEstampadaId'
    // dentro de la clave compuesta 'id'.
    Set<PropsEstampaAplicada> findByIdCamisetaEstampadaId(Long camisetaEstampadaId);
}
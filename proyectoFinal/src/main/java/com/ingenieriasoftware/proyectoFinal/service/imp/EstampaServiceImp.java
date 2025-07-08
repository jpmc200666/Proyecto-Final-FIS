package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.dtos.EstampaDTO;
import com.ingenieriasoftware.proyectoFinal.models.Estampa;
import com.ingenieriasoftware.proyectoFinal.repositories.EstampaRepository;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.IEstampaService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EstampaServiceImp implements IEstampaService {

    @Autowired
    private EstampaRepository estampaRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<EstampaDTO> findAll() {
        // Consulta personalizada con EntityManager para cargar imágenes
//        TypedQuery<Estampa> query = entityManager.createQuery("SELECT e FROM Estampa e JOIN FETCH e.imagenes", Estampa.class);

        /**
         * Se deja left join, para traer las estampas así no tengan imagenes
         */
        TypedQuery<Estampa> query = entityManager.createQuery("SELECT e FROM Estampa e LEFT JOIN e.imagenes", Estampa.class);

        List<Estampa> estampas = query.getResultList();

        ModelMapper modelMapper = new ModelMapper();

        // Mapeo de entidades a DTOs
        return estampas.stream()
                .map(estampa -> modelMapper.map(estampa, EstampaDTO.class))
                .collect(Collectors.toList());
    }
}


package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaDTO;
import com.ingenieriasoftware.proyectoFinal.repositories.CamisetaRepository;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICamisetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CamisetaServiceImp implements ICamisetaService {

    @Autowired
    private CamisetaRepository camisetaDAO;

    @Override
    public List<CamisetaDTO> findAll(){
        ModelMapper modelMapper = new ModelMapper();

        return StreamSupport.stream(camisetaDAO.findAll().spliterator(), false)
                .map(camiseta -> modelMapper.map(camiseta, CamisetaDTO.class))
                .collect(Collectors.toList());
    }

}

package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaEstampadaDTO;
import com.ingenieriasoftware.proyectoFinal.models.CamisetaEstampada;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICamisetaEstampadaService;
import com.ingenieriasoftware.proyectoFinal.repositories.CamisetaEstampadaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class CamisetaEstampadaServiceImp implements ICamisetaEstampadaService {

    @Autowired
    private CamisetaEstampadaRepository camisetaEstampadaRepository;


    @Override
    public CamisetaEstampada findById(Long id) {
        Optional<CamisetaEstampada> optionalCamisetaEstampada = camisetaEstampadaRepository.findById(id);
        if (optionalCamisetaEstampada.isPresent()) return optionalCamisetaEstampada.get();
        System.out.println(String.format("La camiseta estampada %s no existe", id));
        return null;
    }

    @Override
    public CamisetaEstampadaDTO crearCamisetaEstampada(CamisetaEstampadaDTO camisetaEstampadaDTO) {
        try{
            ModelMapper modelMapper = new ModelMapper();
            CamisetaEstampada camisetaEstampada = modelMapper.map(camisetaEstampadaDTO, CamisetaEstampada.class);
            this.camisetaEstampadaRepository.save(camisetaEstampada);
            return camisetaEstampadaDTO;
        }catch (Exception ex){
            throw new UnsupportedOperationException("Error al guardar la camiseta estampada");
        }
    }
}
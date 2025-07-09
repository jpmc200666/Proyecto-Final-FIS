package com.ingenieriasoftware.proyectoFinal.service.imp;

import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaEstampadaDTO;
import com.ingenieriasoftware.proyectoFinal.dtos.CamisetaDTO;
import com.ingenieriasoftware.proyectoFinal.dtos.PropsEstampaAplicadaDTO;
import com.ingenieriasoftware.proyectoFinal.models.Camiseta;
import com.ingenieriasoftware.proyectoFinal.models.CamisetaEstampada;
import com.ingenieriasoftware.proyectoFinal.models.Estampa;
import com.ingenieriasoftware.proyectoFinal.models.PropsEstampaAplicada;
import com.ingenieriasoftware.proyectoFinal.models.PropsEstampaAplicadaId; // Importación necesaria
import com.ingenieriasoftware.proyectoFinal.repositories.CamisetaRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.EstampaRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.PropsEstampaAplicadaRepository;
import com.ingenieriasoftware.proyectoFinal.service.interfaces.ICamisetaEstampadaService;
import com.ingenieriasoftware.proyectoFinal.repositories.CamisetaEstampadaRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException; // Importar EntityNotFoundException
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;


@Service
public class CamisetaEstampadaServiceImp implements ICamisetaEstampadaService {

    @Autowired
    private CamisetaEstampadaRepository camisetaEstampadaRepository;

    @Autowired
    private CamisetaRepository camisetaRepository;

    @Autowired
    private EstampaRepository estampaRepository;

    @Autowired
    private PropsEstampaAplicadaRepository propsEstampaAplicadaRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    public CamisetaEstampadaServiceImp() {
        // Asegúrate de que ModelMapper sepa cómo mapear Camiseta a CamisetaDTO
        TypeMap<Camiseta, CamisetaDTO> camisetaTypeMap = modelMapper.getTypeMap(Camiseta.class, CamisetaDTO.class);
        if (camisetaTypeMap == null) {
            camisetaTypeMap = modelMapper.createTypeMap(Camiseta.class, CamisetaDTO.class);
        }

        // Configuración para mapear de PropsEstampaAplicadaDTO a PropsEstampaAplicada (Entidad)
        TypeMap<PropsEstampaAplicadaDTO, PropsEstampaAplicada> fromPropsDtoToEntityMap = modelMapper.getTypeMap(PropsEstampaAplicadaDTO.class, PropsEstampaAplicada.class);
        if (fromPropsDtoToEntityMap == null) {
            fromPropsDtoToEntityMap = modelMapper.createTypeMap(PropsEstampaAplicadaDTO.class, PropsEstampaAplicada.class);
        }
        fromPropsDtoToEntityMap.addMappings(mapper -> {
            mapper.skip(PropsEstampaAplicada::setCamisetaEstampada); // Se establecerá manualmente
            mapper.skip(PropsEstampaAplicada::setEstampa);           // Se establecerá manualmente
            // Eliminamos esta línea ya que causaba el error de lambda y no es necesaria:
            // mapper.map(PropsEstampaAplicadaDTO::getId, PropsEstampaAplicada::setEstampasAplicadasId);
            // La asignación de 'estampasAplicadasId' se hará manualmente desde la clave del mapa DTO
            mapper.skip(PropsEstampaAplicada::setEstampasAplicadasId); // ¡Asegúrate de que no se intente mapear automáticamente!
        });

        // Configuración para mapear de PropsEstampaAplicada (Entidad) a PropsEstampaAplicadaDTO
        TypeMap<PropsEstampaAplicada, PropsEstampaAplicadaDTO> fromPropsEntityToDtoMap = modelMapper.getTypeMap(PropsEstampaAplicada.class, PropsEstampaAplicadaDTO.class);
        if (fromPropsEntityToDtoMap == null) {
            fromPropsEntityToDtoMap = modelMapper.createTypeMap(PropsEstampaAplicada.class, PropsEstampaAplicadaDTO.class);
        }
        fromPropsEntityToDtoMap.addMappings(mapper -> {
            // Mapea el 'estampasAplicadasId' de la entidad al 'id' del DTO para la respuesta
            mapper.map(PropsEstampaAplicada::getEstampasAplicadasId, PropsEstampaAplicadaDTO::setId);
            // Mapea el ID de la Estampa relacionada al campo estampaId del DTO
            mapper.map(src -> src.getEstampa().getId(), PropsEstampaAplicadaDTO::setEstampaId);
        });
    }

    @Override
    public CamisetaEstampada findById(Long id) {
        Optional<CamisetaEstampada> optionalCamisetaEstampada = camisetaEstampadaRepository.findById(id);
        if (optionalCamisetaEstampada.isPresent()) {
            return optionalCamisetaEstampada.get();
        }
        System.out.println(String.format("La camiseta estampada %s no existe", id));
        return null;
    }

    @Override
    public CamisetaEstampadaDTO crearCamisetaEstampada(CamisetaEstampadaDTO camisetaEstampadaDTO) {
        try {
            Long camisetaId = (long) camisetaEstampadaDTO.getCamiseta().getId();
            Camiseta camisetaExistente = camisetaRepository.findById(camisetaId)
                    .orElseThrow(() -> new EntityNotFoundException("La camiseta base con id " + camisetaId + " no existe.")); // Importado EntityNotFoundException

            CamisetaEstampada camisetaEstampada = modelMapper.map(camisetaEstampadaDTO, CamisetaEstampada.class);
            camisetaEstampada.setCamiseta(camisetaExistente);

            System.out.println("Precio de DTO (entrada): " + camisetaEstampadaDTO.getPrecioCamiseta());
            System.out.println("Precio en entidad (después de mapeo): " + camisetaEstampada.getPrecioCamiseta());

            // Guarda la CamisetaEstampada para obtener su ID
            CamisetaEstampada guardadaCamisetaEstampada = this.camisetaEstampadaRepository.save(camisetaEstampada); // 'guardadaCamisetaEstampada' se resuelve aquí

            // Crear y guardar las PropsEstampaAplicada
            if (camisetaEstampadaDTO.getEstampasAplicadas() != null && !camisetaEstampadaDTO.getEstampasAplicadas().isEmpty()) {
                for (Map.Entry<Long, PropsEstampaAplicadaDTO> entry : camisetaEstampadaDTO.getEstampasAplicadas().entrySet()) {
                    Long estampasAplicadasKey = entry.getKey(); // ¡Obtenemos la clave del mapa, que es el ID para 'estampas_aplicadas_id'!
                    PropsEstampaAplicadaDTO propsAplicadaDTO = entry.getValue();

                    Estampa estampaExistente = estampaRepository.findById(propsAplicadaDTO.getEstampaId())
                            .orElseThrow(() -> new EntityNotFoundException("La estampa con id " + propsAplicadaDTO.getEstampaId() + " no existe."));

                    // Crear la clave primaria compuesta
                    PropsEstampaAplicadaId propsId = new PropsEstampaAplicadaId(
                            guardadaCamisetaEstampada.getId(), // ID de la camiseta estampada recién guardada
                            propsAplicadaDTO.getEstampaId()    // ID de la estampa
                    );

                    // Mapear los atributos del DTO a la entidad
                    PropsEstampaAplicada propsAplicadaEntidad = modelMapper.map(propsAplicadaDTO, PropsEstampaAplicada.class);

                    propsAplicadaEntidad.setId(propsId); // Establecer la clave compuesta

                    // Establecer las relaciones (aunque @MapsId ya lo hace, es bueno asegurarlo)
                    propsAplicadaEntidad.setCamisetaEstampada(guardadaCamisetaEstampada);
                    propsAplicadaEntidad.setEstampa(estampaExistente);

                    // ¡ASIGNAR EL VALOR PARA estampas_aplicadas_id AQUI!
                    propsAplicadaEntidad.setEstampasAplicadasId(estampasAplicadasKey);

                    propsEstampaAplicadaRepository.save(propsAplicadaEntidad);
                }
            }

            // Para que el DTO de salida tenga las estampas aplicadas, necesitamos cargarlas y mapearlas.
            Set<PropsEstampaAplicada> loadedPropsEstampasAplicadas = propsEstampaAplicadaRepository.findByIdCamisetaEstampadaId(guardadaCamisetaEstampada.getId());

            // Convertir la colección de entidades a un Map de DTOs para el DTO de respuesta
            Map<Long, PropsEstampaAplicadaDTO> estampasAplicadasForDto = new HashMap<>();
            for (PropsEstampaAplicada propEntity : loadedPropsEstampasAplicadas) {
                PropsEstampaAplicadaDTO propDto = modelMapper.map(propEntity, PropsEstampaAplicadaDTO.class);
                estampasAplicadasForDto.put(propDto.getId(), propDto); // La clave del Map en el DTO es el 'id' de la PropsEstampaAplicadaDTO
            }

            // Mapear la entidad de CamisetaEstampada guardada a su DTO de respuesta
            CamisetaEstampadaDTO responseDto = modelMapper.map(guardadaCamisetaEstampada, CamisetaEstampadaDTO.class);
            responseDto.setEstampasAplicadas(estampasAplicadasForDto); // Asignar el Map con las estampas mapeadas

            return responseDto;

        } catch (EntityNotFoundException ex) {
            ex.printStackTrace();
            throw new RuntimeException("Error de entidad no encontrada: " + ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Error al guardar la camiseta estampada: " + ex.getMessage());
        }
    }
}
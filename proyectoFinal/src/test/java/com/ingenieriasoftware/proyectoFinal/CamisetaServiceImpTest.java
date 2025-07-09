package com.ingenieriasoftware.proyectoFinal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class CamisetaServiceImpTest {

    @Mock
    private CamisetaRepository camisetaRepository;

    @InjectMocks
    private CamisetaServiceImp camisetaService;

    public enum Talla {
        S, M, L, XL
    }


    public static class Camiseta {
        private int id;
        private String color;
        private Talla talla;
        private double precio;
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }
        public Talla getTalla() { return talla; }
        public void setTalla(Talla talla) { this.talla = talla; }
        public double getPrecio() { return precio; }
        public void setPrecio(double precio) { this.precio = precio; }
    }

    public static class CamisetaDTO {
        private int id;
        private String color;
        private Talla talla;
        private double precio;
        public int getId() { return id; }
        public void setId(int id) { this.id = id; }
        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }
        public Talla getTalla() { return talla; }
        public void setTalla(Talla talla) { this.talla = talla; }
        public double getPrecio() { return precio; }
        public void setPrecio(double precio) { this.precio = precio; }
    }

    // Interfaz del Repositorio 
    public interface CamisetaRepository {
        Camiseta save(Camiseta camiseta);
        Optional<Camiseta> findById(int id);
        List<Camiseta> findAll();
    }
    
    // Implementación del Service 
    public static class CamisetaServiceImp {
        private CamisetaRepository camisetaRepository;

        public CamisetaServiceImp(CamisetaRepository camisetaRepository) {
            this.camisetaRepository = camisetaRepository;
        }

        public CamisetaDTO save(CamisetaDTO dto) {
            Camiseta camiseta = new Camiseta();
            camiseta.setColor(dto.getColor());
            camiseta.setTalla(dto.getTalla());
            camiseta.setPrecio(dto.getPrecio());
            
            Camiseta savedCamiseta = camisetaRepository.save(camiseta);
            
            return convertToDTO(savedCamiseta); 
        }

        public CamisetaDTO findById(int id) {
            return camisetaRepository.findById(id).map(this::convertToDTO).orElse(null);
        }

        public List<CamisetaDTO> findAll() {
            return camisetaRepository.findAll().stream().map(this::convertToDTO).toList();
        }

        private CamisetaDTO convertToDTO(Camiseta camiseta) {
            CamisetaDTO dto = new CamisetaDTO();
            dto.setId(camiseta.getId());
            dto.setColor(camiseta.getColor());
            dto.setTalla(camiseta.getTalla());
            dto.setPrecio(camiseta.getPrecio());
            return dto;
        }
    }


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Necesario si no se usa @InjectMocks o para configurar manualmente
        camisetaService = new CamisetaServiceImp(camisetaRepository); 
    }

    /**
     * Prueba para guardar una camiseta.
     */
    @Test
    void testGuardarCamiseta() {
        // 1. Arrange (Preparar)
        // Creamos el DTO que enviaremos al servicio (sin ID)
        CamisetaDTO camisetaDTOEntrada = new CamisetaDTO();
        camisetaDTOEntrada.setColor("Verde");
        camisetaDTOEntrada.setTalla(Talla.L);
        camisetaDTOEntrada.setPrecio(35000.0);

        // Creamos la entidad que esperamos que el repositorio devuelva (con ID)
        Camiseta camisetaGuardada = new Camiseta();
        camisetaGuardada.setId(1); // El ID que asignaría la base de datos
        camisetaGuardada.setColor("Verde");
        camisetaGuardada.setTalla(Talla.L);
        camisetaGuardada.setPrecio(35000.0);

        // Configuramos el mock: cuando se llame a save con CUALQUIER Camiseta,
        // debe devolver nuestra entidad `camisetaGuardada`.
        when(camisetaRepository.save(any(Camiseta.class))).thenReturn(camisetaGuardada);

        // 2. Act (Actuar)
        // Llamamos al método del servicio que queremos probar.
        CamisetaDTO resultadoDTO = camisetaService.save(camisetaDTOEntrada);

        // 3. Assert (Verificar)
        // Verificamos que el resultado no sea nulo y que los datos coincidan.
        assertNotNull(resultadoDTO);
        assertEquals(1, resultadoDTO.getId()); // Verificamos que se asignó el ID
        assertEquals("Verde", resultadoDTO.getColor());
        assertEquals(Talla.L, resultadoDTO.getTalla());
        assertEquals(35000.0, resultadoDTO.getPrecio());
    }

    /**
     * Prueba para buscar una camiseta por su ID.
     */
    @Test
    void testBuscarCamisetaPorId() {
        // 1. Arrange (Preparar)
        // Creamos la entidad que el repositorio debe encontrar.
        Camiseta camisetaExistente = new Camiseta();
        camisetaExistente.setId(2);
        camisetaExistente.setColor("Azul");
        camisetaExistente.setTalla(Talla.M);
        camisetaExistente.setPrecio(30000.0);

        // Configuramos el mock: cuando se busque por el ID 2,
        // debe devolver un Optional que contiene nuestra entidad `camisetaExistente`.
        when(camisetaRepository.findById(2)).thenReturn(Optional.of(camisetaExistente));

        // 2. Act (Actuar)
        // Llamamos al método del servicio.
        CamisetaDTO resultadoDTO = camisetaService.findById(2);

        // 3. Assert (Verificar)
        // Verificamos que el DTO devuelto tiene los datos correctos.
        assertNotNull(resultadoDTO);
        assertEquals(2, resultadoDTO.getId());
        assertEquals("Azul", resultadoDTO.getColor());
        assertEquals(Talla.M, resultadoDTO.getTalla());
        assertEquals(30000.0, resultadoDTO.getPrecio());
    }

    /**
     * Prueba para listar todas las camisetas.
     */
    @Test
    void testFindAll_returnsListOfCamisetas() {
        // Arrange
        Camiseta c1 = new Camiseta();
        c1.setId(1);
        c1.setColor("Negro");
        c1.setTalla(Talla.S);
        c1.setPrecio(20000.0);

        Camiseta c2 = new Camiseta();
        c2.setId(2);
        c2.setColor("Blanco");
        c2.setTalla(Talla.M);
        c2.setPrecio(22000.0);

        when(camisetaRepository.findAll()).thenReturn(Arrays.asList(c1, c2));

        // Act
        List<CamisetaDTO> result = camisetaService.findAll();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Negro", result.get(0).getColor());
        assertEquals(Talla.S, result.get(0).getTalla());
    }
}


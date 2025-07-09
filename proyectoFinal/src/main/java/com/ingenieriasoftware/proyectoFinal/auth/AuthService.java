package com.ingenieriasoftware.proyectoFinal.auth;

import com.ingenieriasoftware.proyectoFinal.dtos.UsuarioDTO;
import com.ingenieriasoftware.proyectoFinal.error.ResponseException;
import com.ingenieriasoftware.proyectoFinal.jwt.JwtService;
import com.ingenieriasoftware.proyectoFinal.models.Administrador;
import com.ingenieriasoftware.proyectoFinal.models.Artista;
import com.ingenieriasoftware.proyectoFinal.models.Cliente;
import com.ingenieriasoftware.proyectoFinal.models.Usuario;
import com.ingenieriasoftware.proyectoFinal.repositories.AdministradorRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.ArtistaRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.ClienteRepository;
import com.ingenieriasoftware.proyectoFinal.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service // Marca esta clase como un componente de servicio manejado por Spring.
@RequiredArgsConstructor // Genera un constructor que incluye todos los campos marcados como final.

public class AuthService {

    @Autowired
    private PasswordEncoder passEncode;

    // Repositorio para manejar operaciones relacionadas con usuarios.
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private AdministradorRepository administradorRepository;
    @Autowired
    private ArtistaRepository artistaRepository;

    // Servicio para la generación y validación de tokens JWT.
    @Autowired
    private JwtService jwtService;

    // Manejador de autenticación proporcionado por Spring Security.
    @Autowired
    private AuthenticationManager authManager;

    /**
     * Realiza el proceso de inicio de sesión para un usuario.
     *
     * @param request Un objeto LoginRequest que contiene las credenciales del usuario.
     * @return Un objeto AuthResponse que contiene información del usuario autenticado y su token.
     * @throws ResponseException Si el usuario no es encontrado o hay problemas en la autenticación.
     */
    public AuthResponse login(LoginRequest request) {
        // Verifica si el usuario existe en el repositorio.
        if (usuarioRepository.findByEmail(request.getEmail()).isEmpty()) {
            System.out.println("User not found"); // Mensaje de depuración.
            throw new ResponseException("User not found", 404); // Lanza una excepción si no se encuentra el usuario.
        }

        // Autentica al usuario utilizando sus credenciales (email y contraseña).
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // Obtiene al usuario desde el repositorio.
        Usuario user = usuarioRepository.findByEmail(request.getEmail()).orElseThrow();

        // Genera un token JWT para el usuario autenticado.
        String token = jwtService.getToken(user);

        // Construye y retorna la respuesta de autenticación con los datos del usuario y el token.
        return AuthResponse.builder()
                .id(user.getId())
                .token(token)
                .email(user.getEmail())
                .nombre(user.getNombre())
//                .roles(getRoleNames(user))
                .roles(List.of("usuario"))
                .build();
    }

    /**
     * Obtiene los nombres de los roles asociados a un usuario.
     *
     * @param user Un objeto UserDetails que representa al usuario autenticado.
     * @return Una lista de cadenas con los nombres de los roles del usuario.
     */
//    private List<String> getRoleNames(UserDetails user) {
//        // Convierte las autoridades (GrantedAuthority) a una lista de nombres de roles.
//        return user.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .toList();
//    }


    /**
     * Crea un nuevo usuario en el sistema.
     *
     * @param request datos del usuario a registrar.
     * @return respuesta de registro con detalles del resultado.
     */
    public RegisterResponse create(UsuarioDTO request) {

        try {
            if (usuarioRepository.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Ya existe un usuario con el email proporcionado");
            }

            Usuario.UsuarioBuilder usuarioBuilder = Usuario.builder()
                    .nombre(request.getNombre())
                    .password(passEncode.encode(request.getPassword()))
                    .email(request.getEmail());

            Usuario usuario = usuarioBuilder.build();


//            usuarioRepository.save(usuario);

            switch (request.getRol()) {
                case "cliente":
                    Cliente cliente = new Cliente(usuarioBuilder);
                    clienteRepository.save(cliente);
                    break;

                case "artista":
                    Artista artista = new Artista(usuarioBuilder);
                    artistaRepository.save(artista);
                    break;

                case "administrador":
                    Administrador administrador = new Administrador(usuarioBuilder);
                    administradorRepository.save(administrador);
                    break;

                default:
                    System.out.println("El rol no existe, se crea unicamente el usuario");
                    //TODO crear manejador de errores
            }

            return RegisterResponse.builder()
                    .statusCode(200)
                    .id(usuario.getId())
                    .nombre(usuario.getNombre())
                    .message("Usuario creado correctamente")
                    .build();
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return RegisterResponse.builder()
                    .statusCode(409)
                    .message(e.getMessage())
                    .build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return RegisterResponse.builder()
                    .statusCode(500)
                    .message("Ocurrió un error inesperado")
                    .build();
        }
    }

}

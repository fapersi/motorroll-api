package com.motorroll.motorroll_api.service.impl;

import com.motorroll.motorroll_api.dto.auth.AuthResponse;
import com.motorroll.motorroll_api.dto.auth.LoginRequest;
import com.motorroll.motorroll_api.dto.auth.RegistroRequest;
import com.motorroll.motorroll_api.exception.CredencialesInvalidasException;
import com.motorroll.motorroll_api.exception.RecursoDuplicadoException;
import com.motorroll.motorroll_api.exception.ReglaDeNegocioException;
import com.motorroll.motorroll_api.mapper.UsuarioMapper;
import com.motorroll.motorroll_api.model.Rol;
import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.UsuarioRepository;
import com.motorroll.motorroll_api.security.JwtService;
import com.motorroll.motorroll_api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsuarioMapper usuarioMapper;

    @Override
    @Transactional
    public AuthResponse registrar(RegistroRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            throw new RecursoDuplicadoException("El nombre de usuario " + request.getUsername() + " ya esta en uso");
        }
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RecursoDuplicadoException("Ya existe una cuenta registrada con el mail " + request.getEmail());
        }
        if (request.getRol() == Rol.ADMIN) {
            throw new ReglaDeNegocioException("Solo podes registrarte como COMPRADOR o VENDEDOR");
        }

        Usuario usuario = Usuario.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .rol(request.getRol())
                .activo(true)
                .build();

        return armarRespuesta(usuarioRepository.save(usuario));
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new CredencialesInvalidasException("Usuario o contrasenia incorrectos"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new CredencialesInvalidasException("Usuario o contrasenia incorrectos");
        }
        if (!usuario.isActivo()) {
            throw new CredencialesInvalidasException("La cuenta esta deshabilitada. Contactate con un administrador");
        }

        return armarRespuesta(usuario);
    }

    private AuthResponse armarRespuesta(Usuario usuario) {
        return AuthResponse.builder()
                .token(jwtService.generarToken(usuario))
                .tipo("Bearer")
                .expiraEnMs(jwtService.getExpiracionMs())
                .usuario(usuarioMapper.aResponse(usuario))
                .build();
    }
}

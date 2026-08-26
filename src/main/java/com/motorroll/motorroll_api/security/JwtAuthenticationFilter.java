package com.motorroll.motorroll_api.security;

import com.motorroll.motorroll_api.model.Usuario;
import com.motorroll.motorroll_api.repository.UsuarioRepository;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Se ejecuta una vez por request: si viene un token valido en el header
 * "Authorization: Bearer ...", deja al usuario autenticado en el contexto de Spring Security.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String PREFIJO = "Bearer ";

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null && header.startsWith(PREFIJO)
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            String token = header.substring(PREFIJO.length());
            try {
                String username = jwtService.extraerUsername(token);

                usuarioRepository.findByUsername(username)
                        .filter(Usuario::isActivo)
                        .ifPresent(usuario -> autenticar(usuario, request));

            } catch (JwtException | IllegalArgumentException ex) {
                // Token invalido o vencido: se sigue sin autenticar y el endpoint protegido devuelve 401.
                SecurityContextHolder.clearContext();
            }
        }

        filterChain.doFilter(request, response);
    }

    private void autenticar(Usuario usuario, HttpServletRequest request) {
        var permisos = List.of(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()));

        var autenticacion = new UsernamePasswordAuthenticationToken(usuario.getUsername(), null, permisos);
        autenticacion.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(autenticacion);
    }
}

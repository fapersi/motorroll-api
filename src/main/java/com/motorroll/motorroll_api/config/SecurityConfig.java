package com.motorroll.motorroll_api.config;

import com.motorroll.motorroll_api.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sesion -> sesion.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(rutas -> rutas

                        .requestMatchers(HttpMethod.GET, "/api/productos/mis-publicaciones").hasAnyRole("VENDEDOR", "ADMIN")

                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/productos", "/api/productos/*", "/api/productos/marcas").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/productos/*/imagenes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/productos/*/resenas").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/turnos/bancos", "/api/turnos/agenda").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categorias", "/api/categorias/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/tiendas", "/api/tiendas/*", "/api/tiendas/*/logo").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/categorias/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/categorias/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/categorias/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/productos/*/resenas").hasRole("COMPRADOR")
                        .requestMatchers(HttpMethod.POST, "/api/productos", "/api/productos/**").hasAnyRole("VENDEDOR", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/productos/**").hasAnyRole("VENDEDOR", "ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/productos/**").hasAnyRole("VENDEDOR", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/productos/**").hasAnyRole("VENDEDOR", "ADMIN")

                        .requestMatchers("/api/carrito", "/api/carrito/**").hasRole("COMPRADOR")
                        .requestMatchers("/api/ordenes", "/api/ordenes/**").hasRole("COMPRADOR")
                        .requestMatchers("/api/turnos/**").hasRole("COMPRADOR")

                        .requestMatchers("/api/mi-tienda", "/api/mi-tienda/**").hasRole("VENDEDOR")
                        .requestMatchers("/api/notificaciones", "/api/notificaciones/**").authenticated()

                        // Gestión de usuarios: /me es para cualquier usuario logueado, el resto solo ADMIN
                        .requestMatchers("/api/usuarios/me").authenticated()
                        .requestMatchers("/api/usuarios/**").hasRole("ADMIN")

                        .anyRequest().authenticated())
                .exceptionHandling(errores -> errores
                        .authenticationEntryPoint((request, response, ex) ->
                                escribirError(response, HttpStatus.UNAUTHORIZED,
                                        "Necesitás iniciar sesión para acceder a este recurso", request.getRequestURI()))
                        .accessDeniedHandler((request, response, ex) ->
                                escribirError(response, HttpStatus.FORBIDDEN,
                                        "Tu rol no tiene permiso para esta operación", request.getRequestURI())))

                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuracion = new CorsConfiguration();
        configuracion.setAllowedOriginPatterns(List.of("http://localhost:*"));
        configuracion.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuracion.setAllowedHeaders(List.of("*"));
        configuracion.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource fuente = new UrlBasedCorsConfigurationSource();
        fuente.registerCorsConfiguration("/**", configuracion);
        return fuente;
    }

    private void escribirError(jakarta.servlet.http.HttpServletResponse response,
                               HttpStatus status, String mensaje, String path) throws java.io.IOException {
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        String cuerpo = """
                {"timestamp":"%s","status":%d,"error":"%s","mensaje":"%s","path":"%s"}"""
                .formatted(LocalDateTime.now(), status.value(), status.getReasonPhrase(), mensaje, path);

        response.getWriter().write(cuerpo);
    }
}
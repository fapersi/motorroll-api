package com.motorroll.motorroll_api.mapper;

import com.motorroll.motorroll_api.dto.resena.ResenaResponse;
import com.motorroll.motorroll_api.dto.resena.ResenasDelProductoResponse;
import com.motorroll.motorroll_api.model.Resena;
import com.motorroll.motorroll_api.model.Usuario;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.IntStream;

@Component
public class ResenaMapper {
    public ResenaResponse aResponse(Resena resena) {
        Usuario autor = resena.getAutor();

        return ResenaResponse.builder()
                .id(resena.getId())
                .estrellas(resena.getEstrellas())
                .comentario(resena.getComentario())
                .autor(autor.getNombre() + " " + autor.getApellido().charAt(0) + ".")
                .autorUsername(autor.getUsername())
                .fecha(resena.getFecha())
                .build();
    }

    public ResenasDelProductoResponse aResumen(List<Resena> resenas) {
        List<Long> porEstrellas = IntStream.rangeClosed(1, 5)
                .map(i -> 6 - i)
                .mapToObj(estrellas -> resenas.stream().filter(r -> r.getEstrellas() == estrellas).count())
                .toList();

        Double promedio = resenas.isEmpty() ? null
                : Math.round(resenas.stream().mapToInt(Resena::getEstrellas).average().orElse(0) * 10) / 10.0;

        return ResenasDelProductoResponse.builder()
                .promedio(promedio)
                .cantidad(resenas.size())
                .porEstrellas(porEstrellas)
                .resenas(resenas.stream().map(this::aResponse).toList())
                .build();
    }
}

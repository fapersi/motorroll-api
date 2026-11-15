package com.motorroll.motorroll_api.service;

import com.motorroll.motorroll_api.dto.producto.ArchivoImagen;
import com.motorroll.motorroll_api.dto.tienda.TiendaRequest;
import com.motorroll.motorroll_api.dto.tienda.TiendaResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TiendaService {
    List<TiendaResponse> listar();

    TiendaResponse obtener(String username);

    TiendaResponse miTienda(String username);

    TiendaResponse actualizar(String username, TiendaRequest request);

    TiendaResponse cambiarLogo(String username, MultipartFile archivo);

    ArchivoImagen obtenerLogo(String username);
}

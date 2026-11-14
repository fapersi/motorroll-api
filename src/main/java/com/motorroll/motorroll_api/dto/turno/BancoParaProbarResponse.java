package com.motorroll.motorroll_api.dto.turno;

import com.motorroll.motorroll_api.dto.producto.FichaTecnicaResponse;
import com.motorroll.motorroll_api.model.TipoVehiculo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BancoParaProbarResponse {
    private Long id;
    private String nombre;
    private String marca;
    private String categoria;
    private String imagen;
    private String vendedor;
    private FichaTecnicaResponse fichaTecnica;
    private List<TipoVehiculo> vehiculosCompatibles;
}

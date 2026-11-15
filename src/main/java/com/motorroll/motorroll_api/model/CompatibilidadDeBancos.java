package com.motorroll.motorroll_api.model;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public final class CompatibilidadDeBancos {
    private CompatibilidadDeBancos() {
    }

    public static List<TipoVehiculo> vehiculosPara(Producto banco) {
        Set<String> traccion = palabras(banco.getFichaTecnica() != null
                ? banco.getFichaTecnica().getTipoTraccion() : null);
        Set<String> categoria = palabras(banco.getCategoria() != null
                ? banco.getCategoria().getNombre() : null);

        if (categoria.contains("moto") || categoria.contains("motos") || traccion.contains("monotraccion")) {
            return List.of(TipoVehiculo.MOTO, TipoVehiculo.CUATRICICLO);
        }
        if (traccion.contains("motor")) {
            return List.of();
        }
        if (traccion.contains("4x4") || traccion.contains("integral") || traccion.contains("awd")) {
            return List.of(TipoVehiculo.AUTO, TipoVehiculo.CAMIONETA_4X4);
        }
        return List.of(TipoVehiculo.AUTO);
    }

    public static boolean admite(Producto banco, TipoVehiculo vehiculo) {
        return vehiculosPara(banco).contains(vehiculo);
    }

    private static Set<String> palabras(String texto) {
        if (texto == null) {
            return Set.of();
        }
        String sinAcentos = Normalizer.normalize(texto, Normalizer.Form.NFD).replaceAll("\\p{M}", "").toLowerCase();
        return Arrays.stream(sinAcentos.split("[^a-z0-9]+"))
                .filter(palabra -> !palabra.isEmpty())
                .collect(Collectors.toSet());
    }
}

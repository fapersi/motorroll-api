package com.motorroll.motorroll_api.model;

import java.util.List;

public final class CompatibilidadDeBancos {
    private CompatibilidadDeBancos() {
    }

    public static List<TipoVehiculo> vehiculosPara(Producto banco) {
        String traccion = textoEnMinusculas(banco.getFichaTecnica() != null
                ? banco.getFichaTecnica().getTipoTraccion() : null);
        String categoria = textoEnMinusculas(banco.getCategoria() != null
                ? banco.getCategoria().getNombre() : null);

        if (categoria.contains("moto") || traccion.contains("monotraccion")) {
            return List.of(TipoVehiculo.MOTO, TipoVehiculo.CUATRICICLO);
        }
        if (traccion.contains("motor")) {
            return List.of(TipoVehiculo.values());
        }
        if (traccion.contains("4x4") || traccion.contains("integral")) {
            return List.of(TipoVehiculo.AUTO, TipoVehiculo.CAMIONETA_4X4);
        }
        return List.of(TipoVehiculo.AUTO);
    }

    public static boolean admite(Producto banco, TipoVehiculo vehiculo) {
        return vehiculosPara(banco).contains(vehiculo);
    }

    private static String textoEnMinusculas(String texto) {
        return texto == null ? "" : texto.toLowerCase();
    }
}

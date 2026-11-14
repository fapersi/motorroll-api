package com.motorroll.motorroll_api.model;

import java.math.BigDecimal;
import java.math.RoundingMode;

public final class ProgramaDePuntos {
    public static final int DOLARES_POR_PUNTO = 100;
    public static final int PUNTOS_PARA_CANJE = 500;
    public static final int PORCENTAJE_DEL_CANJE = 10;

    private ProgramaDePuntos() {
    }

    public static int puntosGanados(BigDecimal totalPagado) {
        return totalPagado.divide(BigDecimal.valueOf(DOLARES_POR_PUNTO), 0, RoundingMode.DOWN).intValue();
    }

    public static BigDecimal descuentoDelCanje(BigDecimal subtotal) {
        return subtotal.multiply(BigDecimal.valueOf(PORCENTAJE_DEL_CANJE))
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }
}

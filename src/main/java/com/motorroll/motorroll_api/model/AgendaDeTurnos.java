package com.motorroll.motorroll_api.model;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

public final class AgendaDeTurnos {
    public static final List<String> HORARIOS = List.of("09:00", "10:30", "12:00", "14:00", "15:30", "17:00");
    public static final int DIAS_DE_ANTICIPACION = 60;

    private AgendaDeTurnos() {
    }

    public static boolean esDiaHabil(LocalDate fecha) {
        return fecha.getDayOfWeek() != DayOfWeek.SATURDAY && fecha.getDayOfWeek() != DayOfWeek.SUNDAY;
    }

    public static boolean estaEnRango(LocalDate fecha) {
        LocalDate hoy = LocalDate.now();
        return fecha.isAfter(hoy) && !fecha.isAfter(hoy.plusDays(DIAS_DE_ANTICIPACION));
    }
}

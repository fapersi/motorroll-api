package com.motorroll.motorroll_api.model;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.MonthDay;
import java.util.List;
import java.util.Set;

public final class AgendaDeTurnos {
    public static final List<String> HORARIOS = List.of("09:00", "10:30", "12:00", "14:00", "15:30", "17:00");
    public static final int DIAS_DE_ANTICIPACION = 60;
    private static final Set<MonthDay> FERIADOS = Set.of(
            MonthDay.of(1, 1), MonthDay.of(3, 24), MonthDay.of(4, 2), MonthDay.of(5, 1),
            MonthDay.of(5, 25), MonthDay.of(6, 20), MonthDay.of(7, 9), MonthDay.of(12, 8),
            MonthDay.of(12, 25));

    private AgendaDeTurnos() {
    }

    public static boolean esDiaHabil(LocalDate fecha) {
        return fecha.getDayOfWeek() != DayOfWeek.SATURDAY && fecha.getDayOfWeek() != DayOfWeek.SUNDAY
                && !FERIADOS.contains(MonthDay.from(fecha));
    }

    public static List<String> feriadosEnRango() {
        LocalDate hoy = LocalDate.now();
        return hoy.datesUntil(hoy.plusDays(DIAS_DE_ANTICIPACION + 1))
                .filter(fecha -> FERIADOS.contains(MonthDay.from(fecha)))
                .map(LocalDate::toString)
                .toList();
    }

    public static boolean estaEnRango(LocalDate fecha) {
        LocalDate hoy = LocalDate.now();
        return fecha.isAfter(hoy) && !fecha.isAfter(hoy.plusDays(DIAS_DE_ANTICIPACION));
    }
}

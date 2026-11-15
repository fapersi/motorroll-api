const TRAZOS = {
  usuario: ['M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8', 'M4 21a8 8 0 0 1 16 0'],
  candado: ['M6 11h12v10H6z', 'M8 11V8a4 4 0 0 1 8 0v3'],
  ojo: ['M2 12s3.5-7 10-7s10 7 10 7s-3.5 7-10 7s-10-7-10-7', 'M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6'],
  ojoTachado: [
    'M3 3l18 18',
    'M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1',
    'M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6',
    'M9.9 9.9a3 3 0 0 0 4.2 4.2',
  ],
  campana: ['M6 17v-6a6 6 0 0 1 12 0v6l1.5 2h-15z', 'M10 21h4'],
  reloj: ['M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18', 'M12 7v5l3 2'],
  TURNO: ['M7 3v3', 'M17 3v3', 'M4 8h16', 'M5 5h14v15H5z', 'M9 13l2 2l4-4'],
  COMPRA: ['M5 8h14l-1.2 12H6.2z', 'M9 8a3 3 0 0 1 6 0'],
  VENTA: ['M3 12l9-9h7v7l-9 9z', 'M15.5 7.5h.01'],
}

function Icono({ nombre }) {
  return (
    <svg className="icono" viewBox="0 0 24 24" aria-hidden="true">
      <path d={TRAZOS[nombre].join(' ')} />
    </svg>
  )
}

export default Icono

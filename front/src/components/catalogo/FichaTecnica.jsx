const CAMPOS = [
  { campo: 'potenciaMaximaHp', etiqueta: 'Potencia máxima', unidad: 'HP' },
  { campo: 'velocidadMaximaKmh', etiqueta: 'Velocidad máxima', unidad: 'km/h' },
  { campo: 'tipoTraccion', etiqueta: 'Tracción', unidad: '' },
  { campo: 'diametroRodilloMm', etiqueta: 'Diámetro de rodillo', unidad: 'mm' },
  { campo: 'pesoKg', etiqueta: 'Peso', unidad: 'kg' },
  { campo: 'requerimientosSala', etiqueta: 'Requerimientos de sala', unidad: '' },
]

function FichaTecnica({ ficha }) {
  if (!ficha) return null
  const conDato = CAMPOS.filter((c) => ficha[c.campo])

  return (
    <table className="ficha">
      <caption>Ficha técnica</caption>
      <tbody>
        {conDato.map((c) => (
          <tr key={c.campo}>
            <th>{c.etiqueta}</th>
            <td>{`${ficha[c.campo]} ${c.unidad}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FichaTecnica

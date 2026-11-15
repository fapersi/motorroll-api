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
  const conDato = CAMPOS.filter((dato) => ficha[dato.campo])

  return (
    <table className="ficha">
      <caption>Ficha técnica</caption>
      <tbody>
        {conDato.map((dato) => (
          <tr key={dato.campo}>
            <th>{dato.etiqueta}</th>
            <td>{`${ficha[dato.campo]} ${dato.unidad}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FichaTecnica

import Estrellas from './Estrellas'
import { formatearDia } from '../../utils/formato'

function ListaResenas({ resenas }) {
  if (resenas.length === 0) {
    return <p className="vacio">Nadie opinó todavía. ¡Comprá y sé el primero!</p>
  }

  return (
    <ul className="lista-resenas">
      {resenas.map((resena) => (
        <li key={resena.id} className="resena">
          <div className="resena-cabecera">
            <Estrellas valor={resena.estrellas} tamanio="chico" />
            <span className="resena-fecha">{formatearDia(resena.fecha)}</span>
          </div>
          <p>{resena.comentario}</p>
          <p className="resena-autor">{resena.autor} · Compra verificada</p>
        </li>
      ))}
    </ul>
  )
}

export default ListaResenas

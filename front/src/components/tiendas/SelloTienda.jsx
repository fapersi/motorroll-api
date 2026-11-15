import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoTienda from './LogoTienda'
import { fetchTiendas } from '../../redux/tiendaSlice'
import { estiloDeMarca } from '../../utils/colores'

function SelloTienda({ vendedor }) {
  const dispatch = useDispatch()
  const lista = useSelector((state) => state.tiendas.lista)
  const tienda = lista ? lista.find((otra) => otra.vendedor === vendedor) : null

  useEffect(() => {
    if (lista === null) dispatch(fetchTiendas())
  }, [dispatch, lista])

  if (!tienda) return <p className="detalle-vendedor">Vendido por {vendedor}</p>

  return (
    <Link to={`/tienda/${vendedor}`} className="sello-tienda" style={estiloDeMarca(tienda)}>
      <LogoTienda tienda={tienda} tamanio="chico" />
      <span>
        Vendido por <strong>{tienda.nombre}</strong>
      </span>
      <span className="sello-tienda-ver">Ver tienda</span>
    </Link>
  )
}

export default SelloTienda

import { configureStore } from '@reduxjs/toolkit'
import usuarioReducer from './usuarioSlice'
import productoReducer from './productoSlice'
import categoriaReducer from './categoriaSlice'
import carritoReducer from './carritoSlice'
import ordenReducer from './ordenSlice'
import resenaReducer from './resenaSlice'
import turnoReducer from './turnoSlice'
import temaReducer from './temaSlice'
import tiendaReducer from './tiendaSlice'
import notificacionReducer from './notificacionSlice'

export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    productos: productoReducer,
    categorias: categoriaReducer,
    carrito: carritoReducer,
    ordenes: ordenReducer,
    resenas: resenaReducer,
    turnos: turnoReducer,
    tema: temaReducer,
    tiendas: tiendaReducer,
    notificaciones: notificacionReducer,
  },
})

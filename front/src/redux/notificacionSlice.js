import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { checkout } from './carritoSlice'
import { cancelTurno, createTurno } from './turnoSlice'
import { login, registrar, sesionCerrada } from './usuarioSlice'

export const fetchNotificaciones = createAsyncThunk(
  'notificaciones/fetchNotificaciones',
  async () => {
    const { data } = await api.get('/api/notificaciones')
    return data
  },
)

export const marcarLeida = createAsyncThunk('notificaciones/marcarLeida', async (id) => {
  const { data } = await api.patch(`/api/notificaciones/${id}/leida`)
  return data
})

export const marcarTodasLeidas = createAsyncThunk('notificaciones/marcarTodasLeidas', async () => {
  const { data } = await api.patch('/api/notificaciones/leidas')
  return data
})

const initialState = { items: null, loading: false, error: null }

const cargando = (state) => {
  state.loading = true
  state.error = null
}

const guardarLista = (state, action) => {
  state.loading = false
  state.items = action.payload
}

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const avisoNuevo = (state, action) => {
  const aviso = action.payload.notificacion
  if (state.items !== null && aviso) state.items = [aviso, ...state.items]
}

const notificacionSlice = createSlice({
  name: 'notificaciones',
  initialState,
  reducers: {
    limpiarError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificaciones.pending, cargando)
      .addCase(fetchNotificaciones.fulfilled, guardarLista)
      .addCase(fetchNotificaciones.rejected, guardarError)
      .addCase(marcarLeida.pending, cargando)
      .addCase(marcarLeida.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex((aviso) => aviso.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(marcarLeida.rejected, guardarError)
      .addCase(marcarTodasLeidas.pending, cargando)
      .addCase(marcarTodasLeidas.fulfilled, guardarLista)
      .addCase(marcarTodasLeidas.rejected, guardarError)
      .addCase(createTurno.fulfilled, avisoNuevo)
      .addCase(cancelTurno.fulfilled, avisoNuevo)
      .addCase(checkout.fulfilled, avisoNuevo)
      .addCase(login.fulfilled, () => initialState)
      .addCase(registrar.fulfilled, () => initialState)
      .addCase(sesionCerrada, () => initialState)
  },
})

export const selectSinLeer = (state) =>
  state.notificaciones.items === null
    ? 0
    : state.notificaciones.items.filter((aviso) => !aviso.leida).length

export const { limpiarError } = notificacionSlice.actions
export default notificacionSlice.reducer

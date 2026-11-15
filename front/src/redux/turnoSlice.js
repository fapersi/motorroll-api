import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { login, registrar, sesionCerrada } from './usuarioSlice'

export const fetchBancos = createAsyncThunk('turnos/fetchBancos', async () => {
  const { data } = await api.get('/api/turnos/bancos')
  return data
})

export const fetchAgenda = createAsyncThunk('turnos/fetchAgenda', async () => {
  const { data } = await api.get('/api/turnos/agenda')
  return data
})

export const fetchMisTurnos = createAsyncThunk('turnos/fetchMisTurnos', async () => {
  const { data } = await api.get('/api/turnos/mios')
  return data
})

export const createTurno = createAsyncThunk('turnos/createTurno', async (nuevoTurno) => {
  const { data } = await api.post('/api/turnos', nuevoTurno)
  return data
})

export const cancelTurno = createAsyncThunk('turnos/cancelTurno', async (id) => {
  const { data } = await api.patch(`/api/turnos/${id}/cancelar`)
  return data
})

const initialState = { bancos: null, agenda: null, items: null, loading: false, error: null }

const mismoHorario = (uno, otro) =>
  uno.bancoId === otro.bancoId && uno.fecha === otro.fecha && uno.hora === otro.hora

const cargando = (state) => {
  state.loading = true
  state.error = null
}

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const turnoSlice = createSlice({
  name: 'turnos',
  initialState,
  reducers: {
    limpiarError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBancos.pending, cargando)
      .addCase(fetchBancos.fulfilled, (state, action) => {
        state.loading = false
        state.bancos = action.payload
      })
      .addCase(fetchBancos.rejected, guardarError)
      .addCase(fetchAgenda.pending, cargando)
      .addCase(fetchAgenda.fulfilled, (state, action) => {
        state.loading = false
        state.agenda = action.payload
      })
      .addCase(fetchAgenda.rejected, guardarError)
      .addCase(fetchMisTurnos.pending, cargando)
      .addCase(fetchMisTurnos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchMisTurnos.rejected, guardarError)
      .addCase(createTurno.pending, cargando)
      .addCase(createTurno.fulfilled, (state, action) => {
        state.loading = false
        state.items = [action.payload, ...state.items]
        state.agenda.ocupados = [...state.agenda.ocupados, action.payload]
      })
      .addCase(createTurno.rejected, (state, action) => {
        guardarError(state, action)
        if (action.error.code === '409' && state.agenda !== null) {
          const { bancoId, fecha, hora } = action.meta.arg
          state.agenda.ocupados = [...state.agenda.ocupados, { bancoId, fecha, hora }]
        }
      })
      .addCase(cancelTurno.pending, cargando)
      .addCase(cancelTurno.fulfilled, (state, action) => {
        const cancelado = action.payload
        state.loading = false
        const index = state.items.findIndex((turno) => turno.id === cancelado.id)
        if (index !== -1) state.items[index] = cancelado
        state.agenda.ocupados = state.agenda.ocupados.filter(
          (ocupado) => !mismoHorario(ocupado, cancelado),
        )
      })
      .addCase(cancelTurno.rejected, guardarError)
      .addCase(login.fulfilled, () => initialState)
      .addCase(registrar.fulfilled, () => initialState)
      .addCase(sesionCerrada, () => initialState)
  },
})

export const { limpiarError } = turnoSlice.actions
export default turnoSlice.reducer

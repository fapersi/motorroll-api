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

const mismoHorario = (a, b) => a.bancoId === b.bancoId && a.fecha === b.fecha && a.hora === b.hora

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
      .addCase(fetchBancos.fulfilled, (state, action) => {
        state.bancos = action.payload
      })
      .addCase(fetchBancos.rejected, guardarError)
      .addCase(fetchAgenda.fulfilled, (state, action) => {
        state.agenda = action.payload
      })
      .addCase(fetchAgenda.rejected, guardarError)
      .addCase(fetchMisTurnos.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(fetchMisTurnos.rejected, guardarError)
      .addCase(createTurno.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTurno.fulfilled, (state, action) => {
        state.loading = false
        state.items = [action.payload, ...state.items]
        state.agenda.ocupados = [...state.agenda.ocupados, action.payload]
      })
      .addCase(createTurno.rejected, guardarError)
      .addCase(cancelTurno.fulfilled, (state, action) => {
        const cancelado = action.payload
        const index = state.items.findIndex((turno) => turno.id === cancelado.id)
        if (index !== -1) state.items[index] = cancelado
        state.agenda.ocupados = state.agenda.ocupados.filter((o) => !mismoHorario(o, cancelado))
      })
      .addCase(cancelTurno.rejected, guardarError)
      .addCase(login.fulfilled, () => initialState)
      .addCase(registrar.fulfilled, () => initialState)
      .addCase(sesionCerrada, () => initialState)
  },
})

export const { limpiarError } = turnoSlice.actions
export default turnoSlice.reducer

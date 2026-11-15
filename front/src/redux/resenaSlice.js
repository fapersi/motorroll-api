import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { checkout } from './carritoSlice'
import { login, registrar, sesionCerrada } from './usuarioSlice'

export const fetchResenas = createAsyncThunk('resenas/fetchResenas', async (productoId) => {
  const { data } = await api.get(`/api/productos/${productoId}/resenas`)
  return data
})

export const createResena = createAsyncThunk(
  'resenas/createResena',
  async ({ productoId, ...nuevaResena }) => {
    const { data } = await api.post(`/api/productos/${productoId}/resenas`, nuevaResena)
    return data
  },
)

const guardarResumen = (state, resumen, productoId) => {
  state.loading = false
  state.resumen = resumen
  state.productoId = productoId
}

const sinCache = (state) => {
  state.resumen = null
  state.productoId = null
}

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const resenaSlice = createSlice({
  name: 'resenas',
  initialState: { resumen: null, productoId: null, loading: false, error: null },
  reducers: {
    limpiarError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResenas.pending, (state) => {
        state.loading = true
        state.error = null
        state.resumen = null
      })
      .addCase(fetchResenas.fulfilled, (state, action) => {
        guardarResumen(state, action.payload, action.meta.arg)
      })
      .addCase(fetchResenas.rejected, guardarError)
      .addCase(createResena.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createResena.fulfilled, (state, action) => {
        guardarResumen(state, action.payload, action.meta.arg.productoId)
      })
      .addCase(createResena.rejected, guardarError)
      .addCase(checkout.fulfilled, (state, action) => {
        const comprado = action.payload.items.some((item) => item.productoId === state.productoId)
        if (comprado && state.resumen !== null) state.resumen.puedeOpinar = true
      })
      .addCase(login.fulfilled, sinCache)
      .addCase(registrar.fulfilled, sinCache)
      .addCase(sesionCerrada, sinCache)
  },
})

export const { limpiarError } = resenaSlice.actions
export default resenaSlice.reducer

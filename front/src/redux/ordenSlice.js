import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { checkout } from './carritoSlice'
import { login, registrar, sesionCerrada } from './usuarioSlice'

export const fetchOrdenes = createAsyncThunk('ordenes/fetchOrdenes', async () => {
  const { data } = await api.get('/api/ordenes')
  return data
})

const initialState = { items: [], cargado: false, ultima: null, loading: false, error: null }

const ordenSlice = createSlice({
  name: 'ordenes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdenes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrdenes.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.cargado = true
      })
      .addCase(fetchOrdenes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.ultima = action.payload
        if (state.cargado) state.items = [action.payload, ...state.items]
      })
      .addCase(login.fulfilled, () => initialState)
      .addCase(registrar.fulfilled, () => initialState)
      .addCase(sesionCerrada, () => initialState)
  },
})

export default ordenSlice.reducer

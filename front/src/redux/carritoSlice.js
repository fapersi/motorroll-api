import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { login, registrar, sesionCerrada } from './usuarioSlice'

export const fetchCarrito = createAsyncThunk(
  'carrito/fetchCarrito',
  async () => {
    const { data } = await api.get('/api/carrito')
    return data
  },
  { condition: (_, { getState }) => !getState().carrito.loading },
)

export const addItem = createAsyncThunk('carrito/addItem', async (productoId) => {
  const { data } = await api.post('/api/carrito/items', { productoId, cantidad: 1 })
  return data
})

export const updateCantidad = createAsyncThunk(
  'carrito/updateCantidad',
  async ({ itemId, cantidad }) => {
    const { data } = await api.put(`/api/carrito/items/${itemId}`, { cantidad })
    return data
  },
)

export const removeItem = createAsyncThunk('carrito/removeItem', async (itemId) => {
  const { data } = await api.delete(`/api/carrito/items/${itemId}`)
  return data
})

export const clearCarrito = createAsyncThunk('carrito/clearCarrito', async () => {
  const { data } = await api.delete('/api/carrito')
  return data
})

export const checkout = createAsyncThunk('carrito/checkout', async (pago) => {
  const { data } = await api.post('/api/carrito/checkout', pago)
  return data
})

const initialState = {
  items: [],
  total: 0,
  cargado: false,
  loading: false,
  error: null,
  errorPago: null,
}

const cargando = (state) => {
  state.loading = true
  state.error = null
}

const guardarCarrito = (state, action) => {
  state.loading = false
  state.items = action.payload.items
  state.total = action.payload.total
  state.cargado = true
}

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const carritoSlice = createSlice({
  name: 'carrito',
  initialState,
  reducers: {
    limpiarError: (state) => {
      state.error = null
      state.errorPago = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarrito.pending, cargando)
      .addCase(fetchCarrito.fulfilled, guardarCarrito)
      .addCase(fetchCarrito.rejected, guardarError)
      .addCase(addItem.pending, cargando)
      .addCase(addItem.fulfilled, guardarCarrito)
      .addCase(addItem.rejected, guardarError)
      .addCase(updateCantidad.pending, cargando)
      .addCase(updateCantidad.fulfilled, guardarCarrito)
      .addCase(updateCantidad.rejected, guardarError)
      .addCase(removeItem.pending, cargando)
      .addCase(removeItem.fulfilled, guardarCarrito)
      .addCase(removeItem.rejected, guardarError)
      .addCase(clearCarrito.pending, cargando)
      .addCase(clearCarrito.fulfilled, guardarCarrito)
      .addCase(clearCarrito.rejected, guardarError)
      .addCase(checkout.pending, (state) => {
        state.loading = true
        state.errorPago = null
      })
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false
        state.items = []
        state.total = 0
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false
        state.errorPago = action.error.message
        state.cargado = false
      })
      .addCase(login.fulfilled, () => initialState)
      .addCase(registrar.fulfilled, () => initialState)
      .addCase(sesionCerrada, () => initialState)
  },
})

export const selectUnidades = (state) =>
  state.carrito.items.map((item) => item.cantidad).reduce((total, cantidad) => total + cantidad, 0)

export const { limpiarError } = carritoSlice.actions
export default carritoSlice.reducer

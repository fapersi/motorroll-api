import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { aResumen, descontarStock } from '../utils/resumenProducto'
import { checkout } from './carritoSlice'
import {
  addFoto,
  createProducto,
  deleteProducto,
  updateDescuento,
  updateProducto,
  updateStock,
} from './productoSlice'
import { login, registrar, sesionCerrada } from './usuarioSlice'

export const fetchTiendas = createAsyncThunk('tiendas/fetchTiendas', async () => {
  const { data } = await api.get('/api/tiendas')
  return data
})

export const fetchTienda = createAsyncThunk('tiendas/fetchTienda', async (vendedor) => {
  const { data } = await api.get(`/api/tiendas/${vendedor}`)
  return data
})

export const fetchMiTienda = createAsyncThunk('tiendas/fetchMiTienda', async () => {
  const { data } = await api.get('/api/mi-tienda')
  return data
})

export const updateMiTienda = createAsyncThunk('tiendas/updateMiTienda', async (diseno) => {
  const { data } = await api.put('/api/mi-tienda', diseno)
  return data
})

export const updateLogo = createAsyncThunk('tiendas/updateLogo', async (archivo) => {
  const formulario = new FormData()
  formulario.append('logo', archivo)
  const { data } = await api.post('/api/mi-tienda/logo', formulario)
  return data
})

const initialState = {
  lista: null,
  actual: null,
  mia: null,
  loading: false,
  guardada: null,
  error: null,
}

const cargando = (state) => {
  state.loading = true
  state.error = null
}

const enviando = (state) => {
  state.loading = true
  state.guardada = null
  state.error = null
}

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const tiendaGuardada = (state, action) => {
  const tienda = action.payload
  state.loading = false
  state.guardada = action.type.startsWith(updateLogo.typePrefix) ? 'logo' : 'diseno'
  state.mia = tienda
  if (state.lista) {
    const index = state.lista.findIndex((otra) => otra.vendedor === tienda.vendedor)
    if (index !== -1) state.lista[index] = tienda
  }
  if (state.actual && state.actual.vendedor === tienda.vendedor) {
    state.actual = { ...tienda, productos: state.actual.productos }
  }
}

const contarPublicacion = (state, vendedor, cambio) => {
  const enLista = state.lista ? state.lista.find((tienda) => tienda.vendedor === vendedor) : null
  if (enLista) enLista.cantidadProductos = enLista.cantidadProductos + cambio
  if (state.actual && state.actual.vendedor === vendedor) {
    state.actual.cantidadProductos = state.actual.cantidadProductos + cambio
  }
}

const publicacionNueva = (state, action) => {
  contarPublicacion(state, action.payload.vendedor, 1)
  if (state.actual && state.actual.vendedor === action.payload.vendedor) {
    state.actual.productos = [aResumen(action.payload), ...state.actual.productos]
  }
}

const publicacionCambiada = (state, action) => {
  if (state.actual === null) return
  const index = state.actual.productos.findIndex((producto) => producto.id === action.payload.id)
  if (index !== -1) state.actual.productos[index] = aResumen(action.payload)
}

const publicacionBorrada = (state, action) => {
  contarPublicacion(state, action.payload.vendedor, -1)
  if (state.actual !== null) {
    state.actual.productos = state.actual.productos.filter(
      (producto) => producto.id !== action.payload.id,
    )
  }
}

const unidadesVendidas = (state, action) => {
  if (state.actual === null) return
  action.payload.items.forEach((vendido) => {
    const producto = state.actual.productos.find((item) => item.id === vendido.productoId)
    if (producto) descontarStock(producto, vendido.cantidad)
  })
}

const tiendaSlice = createSlice({
  name: 'tiendas',
  initialState,
  reducers: {
    limpiarError: (state) => {
      state.error = null
    },
    limpiarGuardada: (state) => {
      state.guardada = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTiendas.pending, cargando)
      .addCase(fetchTiendas.fulfilled, (state, action) => {
        state.loading = false
        state.lista = action.payload
      })
      .addCase(fetchTiendas.rejected, (state, action) => {
        state.loading = false
        state.lista = []
        state.error = action.error.message
      })
      .addCase(fetchTienda.pending, (state) => {
        cargando(state)
        state.actual = null
      })
      .addCase(fetchTienda.fulfilled, (state, action) => {
        state.loading = false
        state.actual = action.payload
      })
      .addCase(fetchTienda.rejected, guardarError)
      .addCase(fetchMiTienda.pending, cargando)
      .addCase(fetchMiTienda.fulfilled, (state, action) => {
        state.loading = false
        state.mia = action.payload
      })
      .addCase(fetchMiTienda.rejected, guardarError)
      .addCase(updateMiTienda.pending, enviando)
      .addCase(updateMiTienda.fulfilled, tiendaGuardada)
      .addCase(updateMiTienda.rejected, guardarError)
      .addCase(updateLogo.pending, enviando)
      .addCase(updateLogo.fulfilled, tiendaGuardada)
      .addCase(updateLogo.rejected, guardarError)
      .addCase(createProducto.fulfilled, publicacionNueva)
      .addCase(updateProducto.fulfilled, publicacionCambiada)
      .addCase(updateStock.fulfilled, publicacionCambiada)
      .addCase(updateDescuento.fulfilled, publicacionCambiada)
      .addCase(addFoto.fulfilled, publicacionCambiada)
      .addCase(deleteProducto.fulfilled, publicacionBorrada)
      .addCase(checkout.fulfilled, unidadesVendidas)
      .addCase(login.fulfilled, (state) => {
        state.mia = null
      })
      .addCase(registrar.fulfilled, (state) => {
        state.mia = null
      })
      .addCase(sesionCerrada, (state) => {
        state.mia = null
      })
  },
})

export const { limpiarError, limpiarGuardada } = tiendaSlice.actions
export default tiendaSlice.reducer

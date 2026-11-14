import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { checkout } from './carritoSlice'
import { createResena } from './resenaSlice'
import { login, registrar, sesionCerrada } from './usuarioSlice'

const SIN_FILTROS = { texto: '', categoriaId: '', precioMin: '', precioMax: '', ordenarPor: '' }

async function subirFotos(producto, fotos) {
  const subidas = fotos.map((foto) => {
    const formulario = new FormData()
    formulario.append('imagen', foto)
    return api.post(`/api/productos/${producto.id}/imagenes`, formulario)
  })
  const respuestas = await Promise.all(subidas)
  const nuevas = respuestas.map((respuesta) => respuesta.data)
  return { ...producto, imagenes: [...producto.imagenes, ...nuevas] }
}

export const fetchProductos = createAsyncThunk('productos/fetchProductos', async (filtros) => {
  const elegidos = Object.entries(filtros).filter(([, valor]) => valor !== '')
  const { data } = await api.get('/api/productos', { params: Object.fromEntries(elegidos) })
  return data
})

export const fetchProductoPorId = createAsyncThunk('productos/fetchProductoPorId', async (id) => {
  const { data } = await api.get(`/api/productos/${id}`)
  return data
})

export const fetchMisProductos = createAsyncThunk('productos/fetchMisProductos', async () => {
  const { data } = await api.get('/api/productos/mis-publicaciones')
  return data
})

export const createProducto = createAsyncThunk(
  'productos/createProducto',
  async ({ fotos, ...nuevoProducto }) => {
    const { data } = await api.post('/api/productos', nuevoProducto)
    return subirFotos(data, fotos)
  },
)

export const updateProducto = createAsyncThunk(
  'productos/updateProducto',
  async ({ id, fotos, ...cambios }) => {
    const { data } = await api.put(`/api/productos/${id}`, cambios)
    return subirFotos(data, fotos)
  },
)

export const updateStock = createAsyncThunk('productos/updateStock', async ({ id, stock }) => {
  const { data } = await api.patch(`/api/productos/${id}/stock`, { stock })
  return data
})

export const updateDescuento = createAsyncThunk(
  'productos/updateDescuento',
  async ({ id, descuento }) => {
    const { data } = await api.patch(`/api/productos/${id}/descuento`, { descuento })
    return data
  },
)

export const addFoto = createAsyncThunk('productos/addFoto', async ({ producto, foto }) => {
  return subirFotos(producto, [foto])
})

export const deleteProducto = createAsyncThunk('productos/deleteProducto', async (id) => {
  await api.delete(`/api/productos/${id}`)
  return id
})

const initialState = {
  items: [],
  filtros: SIN_FILTROS,
  filtrosCargados: null,
  detalle: null,
  mios: [],
  miosCargados: false,
  loading: false,
  error: null,
}

const cargando = (state) => {
  state.loading = true
  state.error = null
}

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const publicacionModificada = (state, action) => {
  const index = state.mios.findIndex((producto) => producto.id === action.payload.id)
  if (index !== -1) state.mios[index] = action.payload
  state.loading = false
  state.filtrosCargados = null
  state.detalle = null
}

const descontarStock = (producto, vendidos) => {
  producto.stock = producto.stock - vendidos
  producto.hayStock = producto.stock > 0
}

const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    cambiarFiltros: (state, action) => {
      state.filtros = action.payload
    },
    limpiarError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, cargando)
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.filtrosCargados = action.meta.arg
      })
      .addCase(fetchProductos.rejected, guardarError)
      .addCase(fetchProductoPorId.pending, (state) => {
        state.loading = true
        state.error = null
        state.detalle = null
      })
      .addCase(fetchProductoPorId.fulfilled, (state, action) => {
        state.loading = false
        state.detalle = action.payload
      })
      .addCase(fetchProductoPorId.rejected, guardarError)
      .addCase(fetchMisProductos.pending, cargando)
      .addCase(fetchMisProductos.fulfilled, (state, action) => {
        state.loading = false
        state.mios = action.payload
        state.miosCargados = true
      })
      .addCase(fetchMisProductos.rejected, guardarError)
      .addCase(createProducto.pending, cargando)
      .addCase(createProducto.fulfilled, (state, action) => {
        state.loading = false
        state.mios = [action.payload, ...state.mios]
        state.filtrosCargados = null
      })
      .addCase(createProducto.rejected, guardarError)
      .addCase(updateProducto.pending, cargando)
      .addCase(updateProducto.fulfilled, publicacionModificada)
      .addCase(updateProducto.rejected, guardarError)
      .addCase(updateStock.fulfilled, publicacionModificada)
      .addCase(updateStock.rejected, guardarError)
      .addCase(updateDescuento.fulfilled, publicacionModificada)
      .addCase(updateDescuento.rejected, guardarError)
      .addCase(addFoto.fulfilled, publicacionModificada)
      .addCase(addFoto.rejected, guardarError)
      .addCase(deleteProducto.fulfilled, (state, action) => {
        const index = state.mios.findIndex((producto) => producto.id === action.payload)
        if (index !== -1) state.mios[index].activo = false
        state.items = state.items.filter((producto) => producto.id !== action.payload)
        state.detalle = null
      })
      .addCase(deleteProducto.rejected, guardarError)
      .addCase(checkout.fulfilled, (state, action) => {
        action.payload.items.forEach((vendido) => {
          const enCatalogo = state.items.find((producto) => producto.id === vendido.productoId)
          if (enCatalogo) descontarStock(enCatalogo, vendido.cantidad)
          if (state.detalle && state.detalle.id === vendido.productoId) {
            descontarStock(state.detalle, vendido.cantidad)
          }
        })
      })
      .addCase(createResena.fulfilled, (state, action) => {
        if (state.detalle) {
          state.detalle.calificacion = action.payload.promedio
          state.detalle.cantidadResenas = action.payload.cantidad
        }
        state.filtrosCargados = null
      })
      .addCase(login.fulfilled, (state) => {
        state.mios = []
        state.miosCargados = false
      })
      .addCase(registrar.fulfilled, (state) => {
        state.mios = []
        state.miosCargados = false
      })
      .addCase(sesionCerrada, (state) => {
        state.mios = []
        state.miosCargados = false
      })
  },
})

export const { cambiarFiltros, limpiarError } = productoSlice.actions
export default productoSlice.reducer

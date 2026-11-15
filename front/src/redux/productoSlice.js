import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'
import { aResumen, descontarStock } from '../utils/resumenProducto'
import { checkout } from './carritoSlice'
import { createResena } from './resenaSlice'
import { login, registrar, sesionCerrada } from './usuarioSlice'

const SIN_FILTROS = { texto: '', categorias: [], precioMin: '', precioMax: '', ordenarPor: '' }

async function subirFotos(producto, fotos) {
  const nuevas = []
  for (const foto of fotos) {
    const formulario = new FormData()
    formulario.append('imagen', foto)
    const { data } = await api.post(`/api/productos/${producto.id}/imagenes`, formulario)
    nuevas.push(data)
  }
  return { ...producto, imagenes: [...producto.imagenes, ...nuevas] }
}

export const fetchProductos = createAsyncThunk('productos/fetchProductos', async (filtros) => {
  const { categorias, ...resto } = filtros
  const params = Object.fromEntries(Object.entries(resto).filter(([, valor]) => valor !== ''))
  if (categorias.length > 0) params.categoriaId = categorias.join(',')
  const { data } = await api.get('/api/productos', { params })
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

export const deleteProducto = createAsyncThunk('productos/deleteProducto', async (producto) => {
  await api.delete(`/api/productos/${producto.id}`)
  return { id: producto.id, vendedor: producto.vendedor }
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

const sinFiltros = (filtros) =>
  filtros !== null &&
  filtros.texto === '' &&
  filtros.categorias.length === 0 &&
  filtros.precioMin === '' &&
  filtros.precioMax === '' &&
  filtros.ordenarPor === ''

const publicacionModificada = (state, action) => {
  const producto = action.payload
  state.loading = false
  const index = state.mios.findIndex((mio) => mio.id === producto.id)
  if (index !== -1) state.mios[index] = producto
  const enCatalogo = state.items.findIndex((item) => item.id === producto.id)
  if (enCatalogo !== -1) state.items[enCatalogo] = aResumen(producto)
  if (state.detalle !== null && state.detalle.id === producto.id) state.detalle = producto
}

const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    cambiarFiltros: (state, action) => {
      const cambio = Object.keys(action.payload).some(
        (clave) => String(action.payload[clave]) !== String(state.filtros[clave]),
      )
      if (cambio) state.filtros = action.payload
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
        if (sinFiltros(state.filtrosCargados)) {
          state.items = [aResumen(action.payload), ...state.items]
        }
      })
      .addCase(createProducto.rejected, guardarError)
      .addCase(updateProducto.pending, cargando)
      .addCase(updateProducto.fulfilled, publicacionModificada)
      .addCase(updateProducto.rejected, guardarError)
      .addCase(updateStock.pending, cargando)
      .addCase(updateStock.fulfilled, publicacionModificada)
      .addCase(updateStock.rejected, guardarError)
      .addCase(updateDescuento.pending, cargando)
      .addCase(updateDescuento.fulfilled, publicacionModificada)
      .addCase(updateDescuento.rejected, guardarError)
      .addCase(addFoto.pending, cargando)
      .addCase(addFoto.fulfilled, publicacionModificada)
      .addCase(addFoto.rejected, guardarError)
      .addCase(deleteProducto.pending, cargando)
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.loading = false
        const { id } = action.payload
        const index = state.mios.findIndex((producto) => producto.id === id)
        if (index !== -1) state.mios[index].activo = false
        state.items = state.items.filter((producto) => producto.id !== id)
        if (state.detalle !== null && state.detalle.id === id) state.detalle = null
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
        const opinado = state.items.find((item) => item.id === action.meta.arg.productoId)
        if (opinado) {
          opinado.calificacion = action.payload.promedio
          opinado.cantidadResenas = action.payload.cantidad
        }
        if (state.detalle) {
          state.detalle.calificacion = action.payload.promedio
          state.detalle.cantidadResenas = action.payload.cantidad
        }
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

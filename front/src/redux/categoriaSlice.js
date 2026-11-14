import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'

export const fetchCategorias = createAsyncThunk('categorias/fetchCategorias', async () => {
  const { data } = await api.get('/api/categorias')
  return data
})

export const createCategoria = createAsyncThunk('categorias/createCategoria', async (nueva) => {
  const { data } = await api.post('/api/categorias', nueva)
  return data
})

export const updateCategoria = createAsyncThunk(
  'categorias/updateCategoria',
  async ({ id, ...cambios }) => {
    const { data } = await api.put(`/api/categorias/${id}`, cambios)
    return data
  },
)

export const deleteCategoria = createAsyncThunk('categorias/deleteCategoria', async (id) => {
  await api.delete(`/api/categorias/${id}`)
  return id
})

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const categoriaSlice = createSlice({
  name: 'categorias',
  initialState: { items: [], cargado: false, loading: false, error: null },
  reducers: {
    limpiarError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.cargado = true
      })
      .addCase(fetchCategorias.rejected, guardarError)
      .addCase(createCategoria.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload]
      })
      .addCase(createCategoria.rejected, guardarError)
      .addCase(updateCategoria.fulfilled, (state, action) => {
        const guardada = action.payload
        const index = state.items.findIndex((categoria) => categoria.id === guardada.id)
        if (index !== -1) state.items[index] = guardada
        state.items
          .filter((categoria) => categoria.categoriaPadreId === guardada.id)
          .forEach((hija) => {
            hija.categoriaPadreNombre = guardada.nombre
          })
      })
      .addCase(updateCategoria.rejected, guardarError)
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.items = state.items.filter((categoria) => categoria.id !== action.payload)
      })
      .addCase(deleteCategoria.rejected, guardarError)
  },
})

export const { limpiarError } = categoriaSlice.actions
export default categoriaSlice.reducer

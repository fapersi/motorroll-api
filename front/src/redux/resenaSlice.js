import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api'

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

const guardarResumen = (state, action) => {
  state.loading = false
  state.resumen = action.payload
  state.productoId = action.meta.arg.productoId || action.meta.arg
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
      .addCase(fetchResenas.fulfilled, guardarResumen)
      .addCase(fetchResenas.rejected, guardarError)
      .addCase(createResena.fulfilled, guardarResumen)
      .addCase(createResena.rejected, guardarError)
  },
})

export const { limpiarError } = resenaSlice.actions
export default resenaSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, SESION_VENCIDA } from '../utils/api'
import { borrarSesion, guardarSesion, obtenerUsuario } from '../utils/sesion'

export const login = createAsyncThunk('usuario/login', async (credenciales) => {
  const { data } = await api.post('/api/auth/login', credenciales)
  guardarSesion(data)
  return data
})

export const registrar = createAsyncThunk('usuario/registrar', async (nuevoUsuario) => {
  const { data } = await api.post('/api/auth/registro', nuevoUsuario)
  guardarSesion(data)
  return data
})

export const fetchPerfil = createAsyncThunk('usuario/fetchPerfil', async () => {
  const { data } = await api.get('/api/usuarios/me')
  return data
})

export const updatePerfil = createAsyncThunk('usuario/updatePerfil', async (perfil) => {
  const { data } = await api.put('/api/usuarios/me', perfil)
  guardarSesion(data)
  return data
})

export const fetchUsuarios = createAsyncThunk('usuario/fetchUsuarios', async () => {
  const { data } = await api.get('/api/usuarios')
  return data
})

export const updateRol = createAsyncThunk('usuario/updateRol', async ({ id, rol }) => {
  const { data } = await api.put(`/api/usuarios/${id}/rol`, { rol })
  return data
})

export const updateEstado = createAsyncThunk('usuario/updateEstado', async ({ id, activo }) => {
  const { data } = await api.put(`/api/usuarios/${id}/estado`, { activo })
  return data
})

export const deleteUsuario = createAsyncThunk('usuario/deleteUsuario', async (id) => {
  await api.delete(`/api/usuarios/${id}`)
  return id
})

export const cerrarSesion = () => (dispatch) => {
  borrarSesion()
  dispatch(usuarioSlice.actions.sesionCerrada())
}

const cargando = (state) => {
  state.loading = true
  state.error = null
}

const sesionIniciada = (state, action) => {
  state.loading = false
  state.sesion = action.payload.usuario
  state.perfilCargado = true
}

const usuarioModificado = (state, action) => {
  state.loading = false
  const index = state.lista.findIndex((usuario) => usuario.id === action.payload.id)
  if (index !== -1) state.lista[index] = action.payload
}

const guardarError = (state, action) => {
  state.loading = false
  state.error = action.error.message
}

const sesionVencida = (action) =>
  action.type.endsWith('/rejected') && action.error && action.error.message === SESION_VENCIDA

const esCompraConfirmada = (action) => action.type === 'carrito/checkout/fulfilled'

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: {
    sesion: obtenerUsuario(),
    perfilCargado: false,
    lista: [],
    listaCargada: false,
    loading: false,
    error: null,
  },
  reducers: {
    sesionCerrada: (state) => {
      state.sesion = null
      state.perfilCargado = false
      state.lista = []
      state.listaCargada = false
      state.error = null
    },
    limpiarError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, cargando)
      .addCase(login.fulfilled, sesionIniciada)
      .addCase(login.rejected, guardarError)
      .addCase(registrar.pending, cargando)
      .addCase(registrar.fulfilled, sesionIniciada)
      .addCase(registrar.rejected, guardarError)
      .addCase(updatePerfil.pending, cargando)
      .addCase(updatePerfil.fulfilled, sesionIniciada)
      .addCase(updatePerfil.rejected, guardarError)
      .addCase(fetchPerfil.pending, cargando)
      .addCase(fetchPerfil.fulfilled, (state, action) => {
        state.loading = false
        state.sesion = action.payload
        state.perfilCargado = true
      })
      .addCase(fetchPerfil.rejected, guardarError)
      .addCase(fetchUsuarios.pending, cargando)
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.loading = false
        state.lista = action.payload
        state.listaCargada = true
      })
      .addCase(fetchUsuarios.rejected, guardarError)
      .addCase(updateRol.pending, cargando)
      .addCase(updateRol.fulfilled, usuarioModificado)
      .addCase(updateRol.rejected, guardarError)
      .addCase(updateEstado.pending, cargando)
      .addCase(updateEstado.fulfilled, usuarioModificado)
      .addCase(updateEstado.rejected, guardarError)
      .addCase(deleteUsuario.pending, cargando)
      .addCase(deleteUsuario.fulfilled, (state, action) => {
        state.loading = false
        state.lista = state.lista.filter((usuario) => usuario.id !== action.payload)
      })
      .addCase(deleteUsuario.rejected, guardarError)
      .addMatcher(esCompraConfirmada, (state, action) => {
        if (state.sesion === null) return
        const { puntosUsados, puntosGanados } = action.payload
        state.sesion.puntos = state.sesion.puntos - puntosUsados + puntosGanados
      })
      .addMatcher(sesionVencida, (state) => {
        state.sesion = null
        state.error = SESION_VENCIDA
      })
  },
})

export const { sesionCerrada, limpiarError } = usuarioSlice.actions
export default usuarioSlice.reducer

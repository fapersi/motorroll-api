import { createSlice } from '@reduxjs/toolkit'
import { temaGuardado } from '../utils/tema'

const temaSlice = createSlice({
  name: 'tema',
  initialState: { modo: temaGuardado() },
  reducers: {
    cambiarTema: (state) => {
      state.modo = state.modo === 'oscuro' ? 'claro' : 'oscuro'
    },
  },
})

export const { cambiarTema } = temaSlice.actions
export default temaSlice.reducer

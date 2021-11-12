import { createSlice } from '@reduxjs/toolkit';
import { GetProductos } from '../../actions/productosActions';

export const initialState = {
  cargando: false,
  listaProductos: [],
  error: null,
  cantidadProductos: 0
};

export const productoSlice = createSlice({
  name: 'producto',
  initialState: initialState,
  extraReducers: {
    [GetProductos.pending]: (state, action) => {
      state.cargando = true;
      state.cantidadProductos = -1;
    },
    [GetProductos.fulfilled]: (state, action) => {
      state.listaProductos = action.payload.data;
      state.cantidadProductos = action.payload.data.length;
      state.cargando = false;
      state.error = null;
    },
    [GetProductos.rejected]: (state, action) => {
      state.listaProductos = [];
      state.cargando = false;
      state.cantidadProductos = 0;
      state.error = 'No se pudieron cargar los productos';
    },
  },
});

export default productoSlice.reducer;

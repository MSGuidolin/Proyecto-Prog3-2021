import { createSlice } from '@reduxjs/toolkit';
import {
  RegistrarMascota,
  ActualizarMascota,
  eliminarMascota,
  GetMascotas,
  GetMascotaById,
} from '../../actions/mascotasActions';

export const initialState = {
  cargando: false,
  listaMascotas: [],
  error: null,
  MascotaSeleccionada: {
    nombre: '',
    especie: '',
    raza: '',
    descripcion: '',
  },
};

export const mascotaSlice = createSlice({
  name: 'mascota',
  initialState: initialState,
  extraReducers: {
    [RegistrarMascota.pending]: (state, action) => {
      state.cargando = true;
    },
    [RegistrarMascota.fulfilled]: (state, action) => {
      console.info(action);
      state.cargando = false;
      state.error = null;
    },
    [RegistrarMascota.rejected]: (state, action) => {
      state.cargando = false;
      state.error = 'Error al guardar la mascota';
    },
    [GetMascotas.pending]: (state, action) => {
      state.cargando = true;
    },
    [GetMascotas.fulfilled]: (state, action) => {
      state.cargando = false;
      state.listaMascotas = action.payload.data;
      state.error = null;
    },
    [GetMascotas.rejected]: (state, action) => {
      state.cargando = false;
      state.error = 'Error al obtener mascotas';
    },
    [GetMascotaById.pending]: (state, action) => {
      state.cargando = true;
    },
    [GetMascotaById.fulfilled]: (state, action) => {
      state.cargando = false;
      state.MascotaSeleccionada = action.payload.data;
      state.error = null;
    },
    [GetMascotaById.rejected]: (state, action) => {
      state.cargando = false;
      state.error = 'Error al obtener la mascota';
    },
    [ActualizarMascota.pending]: (state, action) => {
      state.cargando = true;
    },
    [ActualizarMascota.fulfilled]: (state, action) => {
      state.cargando = false;
      state.MascotaSeleccionada = null;
      state.error = null;
    },
    [ActualizarMascota.rejected]: (state, action) => {
      state.cargando = false;
      state.error = 'Error al actualizar la mascota';
    },
    [eliminarMascota.pending]: (state, action) => {
      state.cargando = true;
    },
    [eliminarMascota.fulfilled]: (state, action) => {
      state.cargando = false;
      state.MascotaSeleccionada = null;
      state.listaMascotas = state.listaMascotas.filter(t => t._id !== action.payload.id);
      state.error = null;
    },
    [eliminarMascota.rejected]: (state, action) => {
      state.cargando = false;
      state.error = 'Error al eliminar la mascota';
    },
  },
});

export default mascotaSlice.reducer;
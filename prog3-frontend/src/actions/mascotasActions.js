import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:4000';

export const RegistrarMascota = createAsyncThunk(
  'mascota/postMascota',
  async (mascota) => await axios.post(`${BASE_URL}/api/mascotas`, mascota)
);

export const GetMascotas = createAsyncThunk(
  'mascotas/getMascotas',
  async () => await axios.get(`${BASE_URL}/api/mascotas`)
);

export const GetMascotaById = createAsyncThunk(
  'mascota/getMascotaById',
  async (id) => await axios.get(`${BASE_URL}/api/mascotas/${id}`)
);

export const ActualizarMascota = createAsyncThunk(
  'mascota/putMascotaById',
  async ({id, datos}) => await axios.put(`${BASE_URL}/api/mascotas/${id}`, datos)
);

export const eliminarMascota = createAsyncThunk(
  'mascota/deleteMascotaById',
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/api/mascotas/${id}`);
    return {
      id,
      response
    }
  }
);
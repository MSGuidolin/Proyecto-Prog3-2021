import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:4000';

export const GetProductos = createAsyncThunk(
  'producto/getProductos',
  async () => await axios.get(`${BASE_URL}/productos`)
);

// export const CreateProductos = createAsyncThunk(
//   'producto/createProducto',
//   async (producto) => await axios.post(`${BASE_URL}/productos`, producto)
// );

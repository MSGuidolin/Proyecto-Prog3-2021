import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import productoSlice from './slices/productoSlice';
import tareaSlice from './slices/tareaSlice';
import mascotaSlice from './slices/mascotaSlice';

export default configureStore({
  reducer: {
      counter: counterReducer,
      producto: productoSlice,
      tarea: tareaSlice,
      mascota: mascotaSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
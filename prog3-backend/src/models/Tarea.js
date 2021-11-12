const mongoose = require('mongoose');
const {Schema} = mongoose;

const tareaSchema = new Schema({
  nombre: String,
  descripcion: String,
  estaFinalizada: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
});

mongoose.model('tareas', tareaSchema);
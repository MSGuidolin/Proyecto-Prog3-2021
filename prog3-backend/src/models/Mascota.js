const mongoose = require('mongoose');
const {Schema} = mongoose;

const MascotaSchema = new Schema({
  nombre: String,
  especie: String,
  raza: String,
  descripcion: String,
});

mongoose.model('mascotas', MascotaSchema);
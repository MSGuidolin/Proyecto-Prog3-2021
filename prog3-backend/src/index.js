const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/prog3-2021", { useNewUrlParser: true }, 
(err, response)=>console.log(err?"ups":"conectado a mongo"));

app.use(express.json());
app.use(cors());

// Importamos los modelos
require("./models/Tarea");
require("./models/Mascota");


// Importamos las rutas
require("./routes/tareasRoutes")(app);
require("./routes/MascotasRoutes")(app);

const productos = [
    { id: 1, nombre: "Nike", talle: 34, precio: 15000},
    { id: 2, nombre: "Adidas", talle: 35, precio: 25000},
    { id: 3, nombre: "xyz", talle: 35, precio: 25000}
];

const getProductos = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(productos), 1500);
    });
}

app.get("/productos", async (req, res) => {
    const productos = await getProductos();
    res.send(productos);
});

app.listen(PORT, () => {
    console.info(`Iniciando servidor en puerto ${PORT}`);
});
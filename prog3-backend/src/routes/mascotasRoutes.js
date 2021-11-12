const mongoose = require('mongoose');
const Mascota = mongoose.model('mascotas');

const mascotasRoutes = (app) => {
    app.get("/api/mascotas", async (req, res) => {
        const mascotas = await Mascota.find();
        res.send(mascotas);
    });


    app.post("/api/mascotas", async (req, res) => {
        const { nombre, especie, raza, descripcion,} = req.body;

        const mascota = new Mascota({
            nombre,
            especie,
            raza,
            descripcion,
            RegisteredAt: new Date(),
        });

        try {
            let nuevaMascota = await mascota.save();
            res.status(201).send(nuevaMascota);
        } catch (err) {
            if (err.name === 'MongoError') {
                res.status(409).send(err.message);
            }
            res.status(500).send(err);
        }
    });

    app.get("/api/mascotas/:id", async (req, res) => {

        try {
            const id = req.params.id;
            const mascota = await Mascota.findById(id);

            if (mascota) {
                res.send(mascota);
            } else {
                res.status(404).send({ message: `La mascota con id '${id}' no fue encontrada.` });
            }
        } catch (e) {
            res.status(500).send({ message: `Server error.\n\n${e}` });
        }

    });

    
    app.put("/api/mascotas/:id", async (req, res) => {

        const id = req.params.id;

        const mascotaData = req.body || {};
        delete mascotaData.createdAt;
        mascotaData.updatedAt = new Date();

        try {
            let mascota = await mascota.findOneAndUpdate({ _id: id }, mascotaData, { new: true });

            if (!mascota) {
                res.status(404).send({ message: `Error when update service with id ${id}.\n\n${e}` })
            } else {
                res.status(200).send(mascota);
            }
        } catch (err) {
            if (err.name === 'MongoError') {
                res.status(409).send({ message: err.message });
            }
            res.status(500).send({ message: `Unknown Server Error.\n\n Unknow server error when updating pet for id='${id}'` });
        }

    });

    app.delete("/api/mascotas/:id", async (req, res) => {
        const id = req.params.id;
        try {
            let mascota = await mascota.findOneAndRemove({ _id: id });
            if (!mascota) {
                return res.status(404).send({ message: 'Not Found Error' });
            } else {
                return res.status(200).send({_id: id, message:'Mascota removida!'}); 
            }
        } catch (err) {
            return res.status(500).send({ message: `Pet with id '${id}' is not found.` });
        }
    });

};

module.exports = mascotasRoutes;

const mongoose = require('mongoose');
const Tarea = mongoose.model('tareas');

const tareasRoutes = (app) => {
    app.get("/api/tareas", async (req, res) => {
        const tareas = await Tarea.find();
        res.send(tareas);
    });


    app.post("/api/tareas", async (req, res) => {
        const { nombre, descripcion, estaFinalizada } = req.body;

        const tarea = new Tarea({
            nombre,
            descripcion,
            estaFinalizada,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        try {
            let nuevaTarea = await tarea.save();
            res.status(201).send(nuevaTarea);
        } catch (err) {
            if (err.name === 'MongoError') {
                res.status(409).send(err.message);
            }
            res.status(500).send(err);
        }
    });


    app.get("/api/tareas/consulta", async (req, res) => {

        try {
            var regExpTerm = new RegExp(req.query.q, 'i');
            var regExpSearch = [{ nombre: { $regex: regExpTerm } }, { descripcion: { $regex: regExpTerm } }];
            const tareas = await Tarea.find({ '$or': regExpSearch });

            res.status(200).send(tareas);
        } catch (e) {
            res.status(500).send({ message: e });
        }

    });

    app.get("/api/tareas/:id", async (req, res) => {

        try {
            const id = req.params.id;
            const tarea = await Tarea.findById(id);

            if (tarea) {
                res.send(tarea);
            } else {
                res.status(404).send({ message: `La tarea con id '${id}' no fue encontrada.` });
            }
        } catch (e) {
            res.status(500).send({ message: `Server error.\n\n${e}` });
        }

    });

    
    app.put("/api/tareas/:id", async (req, res) => {

        const id = req.params.id;

        const tareaData = req.body || {};
        delete tareaData.createdAt;
        tareaData.updatedAt = new Date();

        try {
            let tarea = await Tarea.findOneAndUpdate({ _id: id }, tareaData, { new: true });

            if (!tarea) {
                res.status(404).send({ message: `Error when update record with id ${id}.\n\n${e}` })
            } else {
                res.status(200).send(tarea);
            }
        } catch (err) {
            if (err.name === 'MongoError') {
                res.status(409).send({ message: err.message });
            }
            res.status(500).send({ message: `Unknown Server Error.\n\n Unknow server error when updating todo for id='${id}'` });
        }

    });

    app.put("/api/tareas/:id/cambiar-finalizada", async (req, res) => {

        const id = req.params.id;
        
        const tarea = await Tarea.findOne({ _id: id });
        
        if (!tarea) {
            return res.status(404).send({ message: `Error when update record with id ${id}.\n\n${e}` })
        }

        if (tarea) {
            tarea.estaFinalizada = !tarea.estaFinalizada;
            tarea.updatedAt = new Date();
            tarea.save();
            res.status(200).send(tarea);
        } else {
            res.status(404).send({ message: `Todo with id '${id}' is not found.` })
        }
            
    });

    app.delete("/api/tareas/:id", async (req, res) => {
        const id = req.params.id;
        try {
            let tarea = await Tarea.findOneAndRemove({ _id: id });
            if (!tarea) {
                return res.status(404).send({ message: 'Not Found Error' });
            } else {
                return res.status(200).send({_id: id, message:'Removida!'}); 
            }
        } catch (err) {
            return res.status(500).send({ message: `Todo with id '${id}' is not found.` });
        }
    });

};

module.exports = tareasRoutes;
import { ObjectId } from 'mongodb';
import client from '../common/conn.js';
import { Pelicula } from './pelicula.js';


const peliculaCollection = client.db('cine').collection('peliculas');


async function handleInsertPeliculaRequest(req, res) {
    try {
        let data = req.body;
        let pelicula = { ...Pelicula }; // Clonamos el schema

        pelicula.nombre = data.nombre;
        pelicula.genero = data.genero;
        pelicula.anio = data.anio;
        pelicula.director = {
            nombre: data.director.nombre,
            apellido: data.director.apellido
        };

        await peliculaCollection.insertOne(pelicula)
            .then((result) => res.status(201).send(result))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "Datos mal formados" });
    }
}


async function handleGetPeliculasRequest(req, res) {
    await peliculaCollection.find().toArray()
        .then((peliculas) => res.status(200).send(peliculas))
        .catch((e) => res.status(500).send({ error: e.message }));
}


async function handleGetPeliculaRequest(req, res) {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        await peliculaCollection.findOne({ _id: id })
            .then((p) => p ? res.status(200).send(p) : res.status(404).send({ error: "No encontrado" }))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "ID mal formado" });
    }
}


async function handleUpdatePeliculaRequest(req, res) {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        const data = req.body;
        await peliculaCollection.updateOne({ _id: id }, { $set: data })
            .then((result) => res.status(200).send(result))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "ID mal formado o datos incorrectos" });
    }
}


async function handleDeletePeliculaRequest(req, res) {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        await peliculaCollection.deleteOne({ _id: id })
            .then((result) => res.status(200).send(result))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "ID mal formado" });
    }
}

export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaRequest,
    handleUpdatePeliculaRequest,
    handleDeletePeliculaRequest
};
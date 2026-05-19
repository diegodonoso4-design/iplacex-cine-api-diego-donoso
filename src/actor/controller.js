import { ObjectId } from 'mongodb';
import client from '../common/conn.js';
import { Actor } from './actor.js';

const actorCollection = client.db('cine').collection('actores');

async function handleInsertActorRequest(req, res) {
    try {
        let data = req.body;
        let actor = { ...Actor };

        actor.nombre = data.nombre;
        actor.apellido = data.apellido;
        actor.edad = data.edad;
        actor.peliculaFavorita = data.peliculaFavorita;

        await actorCollection.insertOne(actor)
            .then((result) => res.status(201).send(result))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "Datos del actor mal formados" });
    }
}

async function handleGetActoresRequest(req, res) {
    await actorCollection.find().toArray()
        .then((actores) => res.status(200).send(actores))
        .catch((e) => res.status(500).send({ error: e.message }));
}

async function handleGetActorRequest(req, res) {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        await actorCollection.findOne({ _id: id })
            .then((a) => a ? res.status(200).send(a) : res.status(404).send({ error: "Actor no encontrado" }))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "ID de actor no válido" });
    }
}

async function handleUpdateActorRequest(req, res) {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        const data = req.body;
        await actorCollection.updateOne({ _id: id }, { $set: data })
            .then((result) => res.status(200).send(result))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "Error al actualizar actor" });
    }
}

async function handleDeleteActorRequest(req, res) {
    try {
        const id = ObjectId.createFromHexString(req.params.id);
        await actorCollection.deleteOne({ _id: id })
            .then((result) => res.status(200).send(result))
            .catch((e) => res.status(500).send({ error: e.message }));
    } catch (e) {
        res.status(400).send({ error: "ID no válido para eliminar" });
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorRequest,
    handleUpdateActorRequest,
    handleDeleteActorRequest
};
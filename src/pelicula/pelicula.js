import { ObjectId } from 'mongodb';

export const Pelicula = {
    _id: ObjectId,
    nombre: String,
    genero: String,
    anio: Number,
    director: {
        nombre: String,
        apellido: String
    }
};
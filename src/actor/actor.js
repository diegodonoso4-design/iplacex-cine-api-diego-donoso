import { ObjectId } from 'mongodb';

export const Actor = {
    _id: ObjectId,
    nombre: String,
    apellido: String,
    edad: Number,
    peliculaFavorita: String
};
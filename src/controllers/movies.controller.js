import { Op } from 'sequelize';
import Movie from '../models/movies.js';

const isStrictInteger = (val) => typeof val === 'number' && Number.isInteger(val);

//Crear la peli.
export const crearPelicula = async (req, res) => {
  try {
    const { title, genre, duration, year, synopsis } = req.body;

    //Verificacion de que los campos no esten vacios.
    if (!title || !genre || duration === undefined || year === undefined) {
      return res.status(400).json({ error: 'Los campos title, genre, duration y year no pueden estar vacios.' });
    }

    if (!isStrictInteger(duration) || duration <= 0) {
      return res.status(400).json({ error: 'La duración debe ser un número entero válido mayor a cero.' });
    }

    //1888 < x < 2026
    const año = new Date().getFullYear();
    if (!isStrictInteger(year) || year < 1888 || year > año) {
      return res.status(400).json({ error: `El año no puede ser menor que 1888 ni mayor que ${año}.` });
    }

    //Que solo exista una pelicula con un titulo especifico.
    const peliculaExiste = await Movie.findOne({ where: { title } });
    if (peliculaExiste) {
      return res.status(400).json({ error: 'Ya existe una película registrada con ese título.' });
    }

    const nuevaPelicula = await Movie.create({ title, genre, duration, year, synopsis });
    return res.status(201).json(nuevaPelicula);

  } catch (error) {
    return res.status(500).json({ error: 'No se pudo crear la película.' });
  }
};
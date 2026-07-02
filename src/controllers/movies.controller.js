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

//Aviso: A partir de aca, agregué comentarios por frustracion. En el proximo commit los borro.

//Vi un tutorial y entendí menos.
//Tras media hora de reflexion volví.


//Edicion de peliculas.
export const actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, duration, year, synopsis } = req.body;

    //verificar previamente que la película con el id requerido exista.
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: 'No existe una pelicula con ese id.' });
    }

    if (!title || !genre || duration === undefined || year === undefined) {
      return res.status(400).json({ error: 'Los campos title, genre, duration y year no pueden estar vacios.' });
    }


    if (!isStrictInteger(duration) || duration <= 0) {
      return res.status(400).json({ error: 'La duración debe ser un número entero válido mayor a cero.' });
    }

    const currentYear = new Date().getFullYear();
    if (!isStrictInteger(year) || year < 1888 || year > currentYear) {
      return res.status(400).json({ error: `El año debe ser un número entero de 4 dígitos entre 1888 y ${currentYear}.` });
    }

    //POR QUÉ EL VISUAL REEMPLAZA LAS LETRAS EN VEZ DE ESCRIBIR NORAMLMENTE????
    //Como se desactiva eso, porfavor ayuda.

    const peliculaExsite= await Movie.findOne({ 
      where: { 
        title,
        id: { [Op.ne]: id }
      } 
    });
    if (peliculaExsite) {
      return res.status(400).json({ error: 'Ya existe una película registrada con ese título.' });
    }

    // Actualizamos los datos
    await movie.update({ title, genre, duration, year, synopsis });
    return res.status(200).json(movie);

  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al actualizar la película.' });
  }
};

//Borrar peliculas.
export const borrarPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    //otra verificacion con id.
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: 'No existe una pelicula con ese id.' });
    }

    // Si existe, se elimina.
    await movie.destroy();
    return res.status(200).json({ message: 'Película eliminada correctamente.' });

  } catch (error) {
    return res.status(500).json({ error: 'No se pudo eliminar la película.' });
  }
};
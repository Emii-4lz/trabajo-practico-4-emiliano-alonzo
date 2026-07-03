import { Router } from 'express';
import { crearPelicula, actualizarPelicula, borrarPelicula } from '../controllers/movies.controller.js';
import Movie from '../models/movies.js'; //Esto es para el get.

const router = Router();

//Esto deberia devolver todas las películas registradas
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo obtener las peliculas.' });
  }
});

//Esto DEBERIA devolver una película especifica por el id.
router.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    
    if (!movie) {
      return res.status(404).json({ error: 'No existe una película con ese id.' });
    }
    
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la película.' });
  }
});

//Esto deberia crear una nueva película...
router.post('/movies', crearPelicula);

//Esto deberia actualizar los datos de una película existente
router.put('/movies/:id', actualizarPelicula);

//Y esto deberia eliminar la película
router.delete('/movies/:id', borrarPelicula);

export default router;
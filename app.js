import express from 'express';
import sequelize from './src/config/database.js';
//import Movie from './src/models/movies.js';
import movieRoutes from './src/routes/movies.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/api', movieRoutes); 

app.get('/', (req, res) => {
  res.send('¡El servidor funciona y las rutas están cargadas!');
});

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log('La conexion funciona.');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutandose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo.', error);
  }
}

startServer();




//Creeria que funciona todo, pero no hice la prueba. Pero almenos no dio errores.
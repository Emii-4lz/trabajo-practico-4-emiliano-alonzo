import express from 'express';
import sequelize from './config/database.js';
import Movie from './models/Movie.js'; 

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('El sevidor funciona.');
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
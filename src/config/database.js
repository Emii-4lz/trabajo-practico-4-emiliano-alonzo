import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('movies', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
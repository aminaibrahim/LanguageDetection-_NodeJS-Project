const Sequelize = require('sequelize');

const sequelize = new Sequelize('college', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = sequelize;

export default db;

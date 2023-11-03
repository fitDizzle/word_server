const { Sequelize } = require('sequelize');
require('dotenv').config()

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false,
  ssl: { rejectUnauthorized: false }
});

db.authenticate();
console.log(db.config);

module.exports = { db };
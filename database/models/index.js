const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false,
  ssl: { rejectUnauthorized: false }
});

module.exports = { db };
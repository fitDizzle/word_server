require('dotenv').config();
const { Sequelize } = require('sequelize');
const words = require("../../word-list.json");

async function initializeDatabase() {
  try {
    const db = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    });

    await db.authenticate();
    console.log('Database connection has been established successfully. ', 'Config: ', db.config);

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

const db = initializeDatabase();

module.exports = { db };

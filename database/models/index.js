require('dotenv').config();
const { Sequelize } = require('sequelize');

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
    console.log(db.config);
    console.log('Database connection has been established successfully.');

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

const db = initializeDatabase();

module.exports = { db };

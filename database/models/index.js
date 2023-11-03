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

    const Word = db.define('Word', {
      word: {
        type: DataTypes.STRING,
      },
      lower_range: {
        type: DataTypes.STRING,
      },
      upper_range: {
        type: DataTypes.STRING,
      },
    },
      {
        db,
        modelName: "Word",
      }
    );

    try {
      Word.sync();
      console.log('Word model successfully created');
    } catch (error) {
      console.log('Error creating Word model: ', error);
    }

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

const db = initializeDatabase();

module.exports = { db };

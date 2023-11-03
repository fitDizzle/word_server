require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
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

    const importData = async () => {
      try {
        let largeIndex = 0;

        const mapAndSave = async (arr) => {
          let lower = arr[0].slice(0, 2);
          let upper = arr[arr.length - 1].slice(0, 2);

          let toCreate = await arr.map((word) => {
            return {
              word,
              lower_range: lower,
              upper_range: upper,
            };
          });
          await Word.bulkCreate(toCreate, { validate: true });

          largeIndex += 999;
        };
        do await mapAndSave(words.slice(largeIndex, largeIndex + 1000));
        while (largeIndex <= words.length);
        console.log("Success");
        process.exit();
      } catch (error) {
        // basic error here
        console.log("error");
        console.log(error);
        process.exit(1);
      }
    };

    importData();

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

const db = initializeDatabase();

module.exports = { db };

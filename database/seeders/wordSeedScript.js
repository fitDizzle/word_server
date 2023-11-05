require("dotenv").config();
const { authenticate_database_connection } = require("../models/index");
const Word = require('../models/Word');
const words = require("../../word-list.json");

const importData = async () => {
  try {
    const batchSize = 1000;
    let startIndex = 0;

    while (startIndex < words.length) {
      const endIndex = Math.min(startIndex + batchSize, words.length);
      const batch = words.slice(startIndex, endIndex);

      const lower = batch[0].slice(0, 2);
      const upper = batch[batch.length - 1].slice(0, 2);

      const toCreate = batch.map((word) => ({
        word,
        lower_range: lower,
        upper_range: upper,
      }));

      await Word.bulkCreate(toCreate, { validate: true });

      startIndex += batchSize;
    }

    console.log("Success");
    process.exit();
  } catch (error) {
    console.error('Error seeding words into the database: ', error);
    process.exit(1);
  }
};

authenticate_database_connection().then(() => {
  console.log('Beginning word data seed.');
  importData();
  console.log('Word data seed complete!');
})
  .catch((error) => {
    console.error('Sorry, we had trouble seeding the words into your database: ', error);
    process.exit(1);
  });

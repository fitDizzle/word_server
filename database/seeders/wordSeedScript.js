// require("dotenv").config();
// const db = require("../models/index");
// const pool = require("../otherConnection");

// // import Model here
// const Word = db.Word;
// // import database
// const connectDB = require("../otherConnection");
// // import datafile if needed
// const words = require("../../word-list.json");


// const importData = async () => {
//   try {
//     let largeIndex = 0;

//     const mapAndSave = async (arr) => {

//       let lower = arr[0].slice(0, 2);
//       let upper = arr[arr.length - 1].slice(0, 2);

//       let toCreate = await arr.map((word) => {
//         return {
//           word,
//           lower_range: lower,
//           upper_range: upper,
//         };
//       });
//       await Word.bulkCreate(toCreate, { validate: true });
     

//       largeIndex += 999;
//     };
//     do await mapAndSave(words.slice(largeIndex, largeIndex + 1000));
//     while (largeIndex <= words.length);
//     console.log("Success");
//     process.exit();
//   } catch (error) {
//     // basic error here
//     console.log("error");
//     console.log(error);
//     process.exit(1);
//   }
// };

// importData();

// // On package json add a seeder script calling node and the file path
require("dotenv").config();
const { Word } = require("../models/index"); // Import the Word model from your Sequelize setup
const words = require("../../word-list.json");
const { sequelize } = require("../models/index"); // Import your Sequelize connection

const importData = async () => {
  try {
    let largeIndex = 0;

    const mapAndSave = async (arr) => {
      let lower = arr[0].slice(0, 2);
      let upper = arr[arr.length - 1].slice(0, 2);

      const toCreate = arr.map((word) => ({
        word,
        lower_range: lower,
        upper_range: upper,
      }));

      await Word.bulkCreate(toCreate, { validate: true });

      largeIndex += 1000;
    };

    do {
      await mapAndSave(words.slice(largeIndex, largeIndex + 1000));
    } while (largeIndex < words.length);

    console.log("Success");
    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

importData();

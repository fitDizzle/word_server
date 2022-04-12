require("dotenv").config();
const db = require("../models/index");
const pool = require("../otherConnection");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// import Model here
const Word = db.Word;
// import database
const connectDB = require("../otherConnection");
// import datafile if needed
const words = require("../../word-list.json");
let sampleWords = ["test", "testing", "again", "hello"];

const clearData = async () => {
  try {
    await Word.destroy({
      where: {
        word: {
          [Op.regexp]: "[a-z]",
        },
      },
    });
    console.log("Database Cleared");
    process.exit();
  } catch (error) {
    // basic error here
    console.log("error");
    console.log(error);
    process.exit(1);
  }
};

clearData();

// On package json add a seeder script calling node and the file path

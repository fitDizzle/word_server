require("dotenv").config();
const db = require("../models/index");

const Word = db.models.Word;
const words = require("../../word-list.json");
console.log(words);

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

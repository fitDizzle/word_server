const db = require("../database/models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Word = db.Word;

module.exports = {
  findRelativeWords: async (req, res) => {
    const letters = req.params.letters;

    letterArray = letters.split(",").sort().slice(0,1);
    otherChars = letters.split(",").sort().slice(2,letters.length);

    try {
      let words = await Word.findAll({
        where: {
          lower_range: {
            [Op.startsWith]: `%${letterArray.join("")}%`,
          }
        },
      });

      words = words.map((x) => x.word).filter((word) => !word.includes(otherChars));

      return res.status(200).json({
        success: true,
        msg: `These are the relative words.`,
        words: [...words],
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("There was an error finding filtered words from the dictionary");
    }
  },
  getAllWords: async (req, res) => {
    const letters = req.params.letters;

    try {
      let words = await Word.findAll({
        where: {
          word: {
            [Op.like]: `%${letters}`,
          },
        },
      });

      words = words.map((x) => x.word);

      return res.status(200).json({
        success: true,
        msg: `These are the relative words.`,
        words: [...words],
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("There was an error finding all words from the dictionary");
    }
  },
};

//const ThingsTodo = require("../database/models/ThingsTodo");
const db = require("../database/models/index");
const Word = db.Word;

const Sequelize = require("sequelize");

const values = require("../letter-value.json");

const Op = Sequelize.Op;

module.exports = {
  validateWord: async (req, res) => {
    try {
      const { words, mults } = req.headers;

      let multipliers = mults.split("#");
      let wordArray = words.split("-");

      let result = await Word.findAll({
        where: {
          word: {
            [Op.or]: wordArray,
          }, 
        },
      });
      if (result.length !== wordArray.length) {
        let validWords = result.map((validWord) => validWord.word);

        let invalidWords = wordArray
          .map((word) => {
            let save = true;
            let index = 0;
            while (index < validWords.length) {
              word === validWords[index] ? (save = false) : null;
              index++;
            }
            return save ? word : null;
          })
          .filter((word) => word);
          let stringPlugin = ""
          let message = ""
        console.log(invalidWords, "invalid");
        if(invalidWords.length > 1){
          stringPlugin = invalidWords
          .map((word, i, array) => {
            return i === array.length - 1 ? `& ${word}` : word;
          })
          .join(", ");
          message = `Your words ${stringPlugin} are invalid`
        
        }else {
          stringPlugin = invalidWords.join("")
          message = `Your word ${stringPlugin} is invalid`
        }
        

        return res.status(200).json({
          success: false,
          msg: message,
          invalidWords,
        });
      }

      let returnedWords = wordArray.map((word, i) => {
        let wordValue = 0;
        let wordMultipliers = multipliers[i].split("-");
        console.log(wordMultipliers, "word multipliers");
        let vals = word.split("").map((letter, i) => {
          if (wordMultipliers[i] === "2,letter") {
            return values[letter] * 2;
          } else if (wordMultipliers[i] === "3,letter") {
            return values[letter] * 3;
          } else {
            return values[letter];
          }
        });
        let reducedValues = vals.reduce((a, b) => a + b, 0);
        wordMultipliers.forEach((mult) => {
          if (mult === "2,word") {
            reducedValues *= 2;
          }
          if (mult === "3,word") {
            reducedValues *= 3;
          }
        });

        return {
          word,
          baseValue: reducedValues,
          multipliers: wordMultipliers
        };
      });

      return res.status(200).json({
        success: true,
        msg: "Word(s) valid",
        wordsAndValues: returnedWords,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("There was an error with dictionary server");
    }
  },
};

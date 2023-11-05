"use strict";
const { DataTypes } = require('sequelize');
const { db } = require('./index');

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
    modelName: "Word",
  }
);

try {
  Word.sync();
  console.log('Word model successfully created');
} catch (error) {
  console.log('Error creating Word model: ', error);
}

module.exports = Word;
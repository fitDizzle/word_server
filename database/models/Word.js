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
    db,
    modelName: "Word",
  }
);

await Word.sync();

module.exports = { Word };
"use strict";
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = (sequelize, DataTypes) => {
  class Word extends Model { }

  Word.init(
    {
      word: DataTypes.STRING,
      lower_range: DataTypes.STRING,
      upper_range: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Word",
    }
  );
  return Word;
};

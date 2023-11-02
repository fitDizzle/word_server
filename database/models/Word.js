"use strict";
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('word', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    word: {
      type: DataTypes.STRING
    },
    lower_range: {
      type: DataTypes.STRING,
    },
    upper_range: {
      type: DataTypes.STRING,
    }
  });
};
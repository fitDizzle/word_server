"use strict";
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('word', {
    word: DataTypes.STRING,
    lower_range: DataTypes.STRING,
    upper_range: DataTypes.STRING,
  });
};

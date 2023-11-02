"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
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

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define('word', {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    word: DataTypes.STRING,
    lower_range: DataTypes.STRING,
    upper_range: DataTypes.STRING,
  });
};
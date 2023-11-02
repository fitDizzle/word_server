const { Sequelize, DataTypes } = require('sequelize');
// const { applyExtraSetup } = require('./extra-setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  logQueryParameters: true,
  benchmark: true
});

const Word = sequelize.define('Word', {
  // Define your Word model properties here
  word: DataTypes.STRING,
  lower_range: DataTypes.STRING,
  upper_range: DataTypes.STRING,
});

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

module.exports = { sequelize, Word };
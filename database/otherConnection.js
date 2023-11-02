const { Pool, Client } = require("pg");
const config = require("../database/config/config.json");
const Sequelize = require("sequelize");

const credentials = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  uri: process.env.DATABASE_URL,
  port: 5432,
  dialectOptions: {
    allowPublicKeyRetrieval: true,
    skipSetTimeZone: true,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};


module.exports = credentials
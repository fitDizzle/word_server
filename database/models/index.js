const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  // { logging: false, ssl: { rejectUnauthorized: false } }
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

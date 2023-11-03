require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const db = require('./database/models/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD

async function startServer() {
    const sequelize = await db; // Wait for the promise to resolve

    // The sequelize instance is now available and can be used here
    // ...
    app.use(routes);
    app.listen(PORT, () => console.log(`Scrabble Dictionary Server is live on port ${PORT}`))
};

startServer();
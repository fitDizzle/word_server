require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function startServer() {
    app.use(routes);
    app.listen(PORT, () => console.log(`Scrabble Dictionary Server is live on port ${PORT}`))
};

startServer();
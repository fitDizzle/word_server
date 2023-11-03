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

app.get('/', (req, res) => {
    res.json({ message: 'WELCOME!!!!' })
})

app.use(routes);
app.listen(PORT, () => console.log(`Scrabble Dictionary Server is live on port ${PORT}`))
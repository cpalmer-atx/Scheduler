const express = require('express');
const routes = require('./routes/index');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(3000, () => console.log('Running on http://localhost:3000'));
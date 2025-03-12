const express = require('express');
const routes = require('./routes/index');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', routes);
app.use('/admin', adminRoutes); // Mount admin routes

app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));
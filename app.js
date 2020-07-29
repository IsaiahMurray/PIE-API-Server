//ENV
require('dotenv').config();

//EXPRESS
const express = require('express');
const app = express();

//CONTROLLERS
const pies = require('./controllers/piecontroller')
const user = require('./controllers/usercontroller')
//DATABASE
const sequelize = require('./db');
sequelize.sync();
//sequelize.sync({force: true});
app.use(express.json());
app.use(require('./middleware/headers'));

//ROUTES
//app.get('/pie', (req, res) => res.send("I love pies!"));
app.use('/auth', user)
app.use('/pies', pies)

//LISTENING
app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`))
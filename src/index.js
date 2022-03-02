const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./config/db');
//Connect to DB
db.connect();

const app = express();
const port = 3000;
const hbs = require('express-handlebars');
const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

//this is to get value for normal form subumit
app.use(express.urlencoded({ extended: true }));
//this is to get value for ajax form subumit
app.use(express.json());

//http logger
app.use(morgan('combined'));

//template engine
app.engine(
    '.hbs',
    hbs.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Route
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


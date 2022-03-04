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

//this middleware is to get value for normal form subumit
app.use(express.urlencoded({ extended: true }));
//this middleware is to get value for ajax form subumit
app.use(express.json());
//http logger
app.use(morgan('combined'));

/**
 ** Start using main middlewares.
 */
const session = require('express-session');
const flash = require('connect-flash');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '123',
    cookie: { maxAge: 3600 }
}));
app.use(flash());


//template engine
app.engine(
    '.hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: require('./config/handlebars-helpers') //only need this
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Route
route(app);


const server = app.listen(3000, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


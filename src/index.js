const express = require('express');
const morgan = require('morgan');
const { set } = require('express/lib/application');
const app = express()
const port = 3000
import { engine } from 'express-handlebars';

//http logger
app.use(morgan('combined'));

//template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.send('home')
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
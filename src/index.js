const path = require('path'); 
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const route = require('./routes');

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(express.json()); 

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", path.resolve(__dirname, './resources/views'));
 
route(app); 

app.listen(process.env.PORT || 3000, () => { 
    const host = process.env.HOST || 'localhost';
    console.log('Running on: ', host);
    console.log('Local host: http://localhost:3000/');
});
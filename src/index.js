//Importando express & morgan

const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
//initializations
const app = express();



require('./lib/passport');

//Configuraciones del Proyecto
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));

app.set('view engine', 'hbs');

//Middlewares
app.use(session({
    secret: 'My yellow duck' ,
    resave: false,
    saveUninitialized: false,
  }));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req,res,next) =>{
    next();
});



//routas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));



//public
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server
app.listen(app.get('port'), ()=> {
    console.log('Server on Port', app.get('port'));

});


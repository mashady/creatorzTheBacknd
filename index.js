const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const winston = require('winston');
const cookieParser = require('cookie-parser');




// route and middleware 

const home = require('./routes/home');
const register = require('./routes/register');
const login = require('./routes/login');
const addPost = require('./routes/addPost');

const app = express();


// Connect To The DataBase
// we have some console errors here :)
mongoose.connect('mongodb://0.0.0.0:27017/mashady',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('connected to database'))
    .catch(err => logger.error(err));

    // winston logger 
    const logger = winston.createLogger({
        //level: 'error',
        level: 'info',
        format: winston.format.json(),
        //defaultMeta: { service: 'user-service' },
        transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' })
    ],
    });
    // what is this?!
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
//app.get('*', chkUser);
app.use('/', home);
app.use('/register', register);
app.use('/login', login);
app.use('/addPost', addPost);
//require('./prod.js')(app);
port = 8000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connection = require('./connection/connection');
const port =  3000;


// const productRoutes = require('./api/routes/products');
// const orderRoutes = require('./api/routes/orders');
// const userRoutes = require('./api/routes/user');
const csvRoutes = require('./api/routes/csv.js');
const dataRoutes = require('./api/routes/data');

//morgan used for logging the requests
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,  POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//routes which should handle requests
app.use('/csv', csvRoutes );
app.use('/data', dataRoutes );

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);

})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


server.listen(port, async () => {
    console.log(`Running on:`, port);
    connection.mongodb();
});


module.exports = app;

//postman collection   https://www.getpostman.com/collections/3bd99f0d9c1da8b11852
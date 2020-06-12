const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();

// options for mongoose
const MongoOption = 
{
    useNewUrlParser : true, 
    useUnifiedTopology : true
};

// connecting mongoose 
mongoose.connect('mongodb://localhost:27017', MongoOption);

// logged middleware
app.use(morgan('dev'));

// body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handling cors error
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin", "*"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accesp, Authoeization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// forwarding requests 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// handling errors
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.statu || 500 );
    res.json({
        error: {
            message: error.message
       }
     });
}); 

module.exports = app;
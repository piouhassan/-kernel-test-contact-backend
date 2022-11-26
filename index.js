require('dotenv').config();
const express = require('express');
const app = express();
const cors =  require('cors');
const bodyparser = require('body-parser')
const http = require('http').createServer(app);
const path =  require('path');
const mongoose = require("mongoose");


const routes =require('./routes/');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE")
    res.header("Access-Control-Allow-Headers","auth-token,Origin,X-Requested-With,Content-type,Accept")
    next();
});


mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connect success')
    })
    .catch(err => console.log(err))



// Manage Middlewares

app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use('/api/v1',routes);

app.use(function(req, res, next) {
    res.status(404);

    res.json({
        'Error' : true,
        "message" : "Resource link not found"
    })

    next()

});




const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server started on port ${port}`));